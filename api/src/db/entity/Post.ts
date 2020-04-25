import {
  Column,
  OneToMany,
  Entity,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { IsNotEmpty } from 'class-validator';
import { Media } from './Media';
import { Comment } from './Comment';
import { mapConnectionsByHashes } from './utils/connection';
import { ConnectionOptions, ID, Connection } from '../../types';
import { getDataLoaderCacheKey } from '../../loaders/utils';
import { unionAllQueries, runRawSQL } from './utils';
import { Reactable } from './Reactable';
import { User } from './User';

export type PostConnectionOptions = ConnectionOptions & {
  authorId?: ID;
};

interface PostConnectionQueryRow {
  id: ID;
  title: string;
  userId: ID;
  createdAt: Date;
  key: string;
  totalCount: number;
}

export type PostConnectionByKey = {
  key: string;
  connection: Connection<PostConnectionQueryRow>;
};

const getPostCursor = (post: PostConnectionQueryRow) => {
  return post.createdAt.toISOString();
};

@Entity()
export class Post extends BaseAbstractEntity {
  @OneToOne(() => Reactable, (reactable) => reactable.post, { cascade: true })
  reactable: Reactable;

  @Column({ length: 200 })
  @IsNotEmpty()
  title: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column()
  userId: ID;

  @OneToOne(
    () => Media,
    // We've specified the "inverse side" on both post and media
    // and created a bi-directional relation.
    // This way, we can load/join relation from both sides,
    // update the related entity from the inverse side etc.
    // Otherwise, "post.media = media" doesn't work, when the "JoinColumn"
    // is on the "Post" entity.
    // https://github.com/typeorm/typeorm/blob/master/docs/one-to-one-relations.md
    (media) => media.post,
  )
  media: Media;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @BeforeInsert()
  private setReactableId() {
    this.reactable.id = this.id;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async format() {
    // TODO: Make the first char of the title uppercase,
    // according to the users culture.
    this.title = this.title.trim();
    await this.baseValidate();
  }

  static async findConnections(args: PostConnectionOptions[]) {
    const hashes = [];
    const queries = [];
    const parameters = {};
    for (let i = 0; i < args.length; i++) {
      const alias = 'post';

      const arg = args[i];
      const { first, after, authorId } = arg;

      const queryBuilder = this.createQueryBuilder(alias);

      const cacheKey = getDataLoaderCacheKey(arg);

      queryBuilder
        .select(`${alias}.id`, 'id')
        .addSelect(`${alias}.title`, 'title')
        .addSelect(`${alias}.userId`, 'userId')
        .addSelect(`${alias}.createdAt`, 'createdAt')
        .addSelect(`'${cacheKey}'`, 'key')
        .addSelect((subQuery) =>
          subQuery.select(`COUNT(${alias}.id)`, 'totalCount').from(this, alias),
        );

      if (authorId) {
        queryBuilder.where(`${alias}.userId = :authorId${i}`);
        Object.assign(parameters, { [`authorId${i}`]: authorId });
      }

      // Adding the cursor pagination condition
      if (after) {
        queryBuilder.andWhere(`${alias}.createdAt < :after${i}`);
        Object.assign(parameters, { [`after${i}`]: after });
      }

      if (first) {
        // Fetching one more edge to find out if there is a next page.
        // (to determine "hasNexPage")
        const take = first + 1;
        queryBuilder.take(take);
      }

      queryBuilder.orderBy(`${alias}.createdAt`, 'DESC');

      const query = queryBuilder.getQuery();

      queries.push(query);
      hashes.push(cacheKey);
    }

    const unionAll = unionAllQueries(queries);
    const rows = await runRawSQL<PostConnectionQueryRow[]>(
      unionAll,
      parameters,
    );
    const connectionsByKey = mapConnectionsByHashes({
      hashes,
      args,
      rows,
      getCursorFn: getPostCursor,
    });
    return connectionsByKey;
  }
}
