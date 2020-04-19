import {
  Entity,
  Column,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
  Brackets,
  OneToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Post } from './Post';
import { ID, ConnectionOptions, Connection } from '../../types';
import { User } from './User';
import { runRawSQL, unionAllQueries } from './utils';
import { getDataLoaderCacheKey } from '../../loaders/utils';
import { mapConnectionsByHashes } from './utils/connection';
import { Reactable } from './Reactable';
import { BaseAbstractEntity } from './BaseAbstractEntity';

export type CommentConnectionOptions = ConnectionOptions & {
  postId: ID;
};

interface CommentConnectionQueryRow {
  id: ID;
  text: string;
  createdAt: Date;
  userId: ID;
  key: string;
  totalCount: number;
}

export type CommentConnectionByKey = {
  key: string;
  connection: Connection<CommentConnectionQueryRow>;
};

@Entity()
export class Comment extends BaseAbstractEntity {
  @OneToOne(() => Reactable, (reactable) => reactable.comment, {
    cascade: true,
  })
  reactable: Reactable;

  @Column({ length: 1000 })
  @IsNotEmpty()
  text: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @Column()
  postId: ID;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column()
  userId: ID;

  @BeforeInsert()
  private setReactableId() {
    this.reactable.id = this.id;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private format() {
    this.text = this.text.trim();
  }

  // To get the cursor, passed object should contain a "createdAt" property
  static getCursor = <T extends { createdAt: Comment['createdAt'] }>(
    partialComment: T,
  ) => {
    return partialComment.createdAt.toISOString();
  };

  static async findConnections(args: CommentConnectionOptions[]) {
    const hashes = [];
    const queries = [];
    const parameters = {};
    for (let i = 0; i < args.length; i++) {
      const alias = 'comment';

      const arg = args[i];
      const { postId, first, after } = arg;

      // "WHERE" conditions those are other than the pagination.
      // This is shared by both pagination query and totalCount query.
      const where = new Brackets((qb) =>
        qb.where(`${alias}.postId = :postId${i}`),
      );
      Object.assign(parameters, { [`postId${i}`]: postId });

      const queryBuilder = this.createQueryBuilder(alias);

      const cacheKey = getDataLoaderCacheKey(arg);

      queryBuilder
        .select(`${alias}.id`, 'id')
        .addSelect(`${alias}.text`, 'text')
        .addSelect(`${alias}.createdAt`, 'createdAt')
        .addSelect(`${alias}.userId`, 'userId')
        .addSelect(`'${cacheKey}'`, 'key')
        .addSelect((subQuery) =>
          subQuery
            .select(`COUNT(${alias}.id)`, 'totalCount')
            .from(this, alias)
            .where(where),
        )
        .where(where);

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
    const rows = await runRawSQL<CommentConnectionQueryRow[]>(
      unionAll,
      parameters,
    );
    const connectionsByKey = mapConnectionsByHashes({
      hashes,
      args,
      rows,
      getCursorFn: this.getCursor,
    });
    return connectionsByKey;
  }
}
