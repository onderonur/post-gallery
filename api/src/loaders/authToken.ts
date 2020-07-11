import { createLoader, getDataLoaderCacheKey } from './utils';
import { RequestUser } from '../types';
import Maybe from 'graphql/tsutils/Maybe';
import {
  AuthToken,
  AuthTokenConnectionByKey,
  AuthTokenConnectionOptions,
} from '../db/entity/AuthToken';
import { emptyConnection } from '../db/entity/utils/connection';

const createSessionConnectionByUserIdLoader = createLoader<
  AuthTokenConnectionOptions,
  AuthTokenConnectionByKey
>(
  async (args, viewer) => {
    // If user is not logged in,
    // we just return empty connections for
    // every args.
    if (!viewer) {
      return args.map((arg) => ({
        key: getDataLoaderCacheKey(arg),
        connection: emptyConnection,
      }));
    }

    const connectionsByKey = await AuthToken.findConnections(
      args as AuthTokenConnectionOptions[],
    );
    return connectionsByKey;
  },
  (result) => result.key,
);

const authTokenLoaders = (viewer: Maybe<RequestUser>) => ({
  authTokenConnectionByUserId: createSessionConnectionByUserIdLoader(viewer),
});

export default authTokenLoaders;
