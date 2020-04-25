import {
  Entity,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  Brackets,
} from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { User } from './User';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { ID, ConnectionOptions, Connection } from '../../types';
import { getDataLoaderCacheKey } from '../../loaders/utils';
import { unionAllQueries, runRawSQL } from './utils';
import { mapConnectionsByHashes } from './utils/connection';
import Maybe from 'graphql/tsutils/Maybe';

interface SesssionConnectionQueryRow {
  id: ID;
  browser: Maybe<string>;
  platform: Maybe<string>;
  os: Maybe<string>;
  createdAt: Date;
  key: string;
  totalCount: number;
}

export type SessionConnectionByKey = {
  key: string;
  connection: Connection<SesssionConnectionQueryRow>;
};

@Entity()
export class AuthToken extends BaseAbstractEntity {
  // We hide this column from queries.
  // We can only query this by explicitly using "addSelect".
  // https://github.com/typeorm/typeorm/issues/828
  @Column({ unique: true, select: true })
  jti: string;

  @Column({ type: 'varchar', nullable: true })
  browser?: string | null;

  @Column({ type: 'varchar', nullable: true })
  platform?: string | null;

  @Column({ type: 'varchar', nullable: true })
  os?: string | null;

  @ManyToOne(() => User, (user) => user.authTokens, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: ID;

  static async signAndSave(req: Request, user: User) {
    const jti = uuidv4();
    const token = jwt.sign({ sub: user.id }, process.env.AUTH_TOKEN_SECRET, {
      jwtid: jti,
    });
    const authToken = this.create();
    authToken.jti = jti;
    authToken.user = user;
    const { useragent } = req;
    if (useragent) {
      authToken.browser = useragent.browser;
      authToken.platform = useragent.platform;
      authToken.os = useragent.os;
    }
    await this.save(authToken);
    return token;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async validate() {
    await this.baseValidate();
  }

  // To get the cursor, passed object should contain a "createdAt" property
  static getCursor = <T extends { createdAt: AuthToken['createdAt'] }>(
    partialAuthToken: T,
  ) => {
    return partialAuthToken.createdAt.toISOString();
  };

  static async findConnections(args: ConnectionOptions[], viewer: User) {
    const hashes = [];
    const queries = [];
    const parameters = {};
    for (let i = 0; i < args.length; i++) {
      const alias = 'session';

      const arg = args[i];
      const { first, after } = arg;
      const userId = viewer?.id;

      // "WHERE" conditions those are other than the pagination.
      // This is shared by both pagination query and totalCount query.
      const where = new Brackets((qb) =>
        qb.where(`${alias}.userId = :userId${i}`),
      );
      Object.assign(parameters, { [`userId${i}`]: userId });

      const queryBuilder = this.createQueryBuilder(alias);

      const cacheKey = getDataLoaderCacheKey(arg);

      queryBuilder
        .select(`${alias}.id`, 'id')
        .addSelect(`${alias}.browser`, 'browser')
        .addSelect(`${alias}.platform`, 'platform')
        .addSelect(`${alias}.os`, 'os')
        .addSelect(`${alias}.createdAt`, 'createdAt')
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
    const rows = await runRawSQL<SesssionConnectionQueryRow[]>(
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

  static findByUserId(userId: ID) {
    return this.find({ where: { userId } });
  }

  static findOneByJti(jti: string) {
    return this.findOne({ where: { jti } });
  }

  static async verify(token: string) {
    let verified;
    try {
      verified = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    } catch (err) {
      return null;
    }
    if (!verified) {
      return null;
    }
    const { jti } = verified as any;
    const foundAuthToken = await AuthToken.findOneByJti(jti);
    if (!foundAuthToken) {
      return null;
    }
    return verified;
  }

  static async verifyAndFindUser(token: string) {
    const verified = await this.verify(token);
    if (!verified) {
      return null;
    }
    const { sub } = verified as any;
    const viewer = await User.findOne(sub);
    return viewer;
  }

  static async deleteByJti(jti: string) {
    await this.delete({ jti });
  }
}
