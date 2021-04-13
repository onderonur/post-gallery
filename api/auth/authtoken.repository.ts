import { NextApiRequest } from 'next';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { GraphConnection, ID } from '@api/shared/shared.types';
import { GraphConnectionArgs, DecodedJwt } from '../shared/shared.types';
import BaseRepository from '../shared/base.repository';
import { createLoader } from '@api/dataloader/dataloader.utils';
import { ForbiddenError, AuthenticationError } from 'apollo-server-micro';
import { Maybe, Session } from '@api/generated/graphql';
import { findGraphConnection } from '@api/db/db.utils';
import { goTrySync } from 'go-try';
import { AuthTokenModel } from './authtoken.model';

export type AuthTokenGraphConnectionArgs = GraphConnectionArgs & {
  userId: Maybe<ID>;
};

const createAuthTokenByJtiLoader = createLoader<string, AuthTokenModel>(
  (jtis) => AuthTokenModel.query().whereIn('jti', jtis as string[]),
  (authToken) => authToken.jti,
);

const authTokenLoaders = () => ({
  authTokenByJti: createAuthTokenByJtiLoader(),
});

type AuthTokenCreateInput = Pick<
  AuthTokenModel,
  'jti' | 'browser' | 'platform' | 'os' | 'userId'
>;

class AuthTokenRepository extends BaseRepository {
  private loaders = authTokenLoaders();

  async create(input: AuthTokenCreateInput) {
    const { browser, jti, userId, platform, os } = input;
    const authToken = await AuthTokenModel.query().insert({
      browser,
      jti,
      userId,
      platform,
      os,
    });
    return authToken;
  }

  async findOneByJti(jti: ID) {
    const authToken = await this.loaders.authTokenByJti.load(jti);
    return authToken;
  }

  async deleteAllExceptCurrent() {
    const { viewer, authToken } = this.context;
    if (!viewer || !authToken) {
      throw new AuthenticationError('You are not logged in');
    }

    const decodedToken = this.decode(authToken);

    const deletedNum = await AuthTokenModel.query()
      .where({
        userId: viewer.id,
      })
      .whereNot({
        jti: decodedToken.jti,
      })
      .delete();

    return !!deletedNum;
  }

  async deleteByJti(jti: ID) {
    const forbiddenError = new ForbiddenError(
      'Not allowed to delete another users session',
    );

    const { viewer } = this.context;
    if (!viewer) {
      throw forbiddenError;
    }

    const authToken = await this.findOneByJti(jti);

    if (!authToken) {
      throw new AuthenticationError('Auth token not found');
    }

    if (authToken.userId !== viewer.id) {
      throw forbiddenError;
    }

    const deletedNum = await authToken.$query().delete();
    return !!deletedNum;
  }

  getCursor(node: AuthTokenModel) {
    return node.id;
  }

  async findConnection(
    args: AuthTokenGraphConnectionArgs,
  ): Promise<GraphConnection<Session>> {
    const { first, after, userId } = args;

    const { viewer, authToken } = this.context;
    // Users can only search for their own information for now.
    // When we have roles like admins etc,
    // this condition will be expanded.
    if (!viewer || !authToken || !userId || viewer.id !== userId) {
      throw new ForbiddenError('Not allowed to do that');
    }

    const connection = await findGraphConnection<AuthTokenModel>({
      after,
      first,
      getCursorFn: this.getCursor,
      orderBy: 'createdAt',
      tableName: AuthTokenModel.tableName,
      where: (query) => {
        query.where({ userId });
      },
    });

    const decodedToken = this.decode(authToken);
    const { jti } = decodedToken as DecodedJwt;

    return {
      ...connection,
      edges: connection.edges.map((edge) => ({
        cursor: edge.cursor,
        node: { ...edge.node, isCurrent: edge.node.jti === jti },
      })),
    };
  }

  async signAndSaveToken(userId: ID, useragent: NextApiRequest['useragent']) {
    const jti = uuidv4();
    const token = jwt.sign({ sub: userId }, process.env.AUTH_TOKEN_SECRET, {
      jwtid: jti,
    });
    await this.create({
      jti,
      userId,
      browser: useragent?.browser,
      os: useragent?.os,
      platform: useragent?.platform,
    });
    return token;
  }

  decode(authToken: string) {
    const decodedToken = jwt.decode(authToken) as DecodedJwt;
    return decodedToken;
  }

  async verify(authToken: string) {
    const result = goTrySync(() =>
      jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET),
    );
    if (result.error) {
      return null;
    }
    const verified = result.data;
    const decoded = verified as DecodedJwt;
    const { jti } = decoded;
    const foundAuthToken = await this.findOneByJti(jti);
    if (!foundAuthToken) {
      return null;
    }
    return foundAuthToken;
  }
}

export default AuthTokenRepository;
