import { createLoader, getDataLoaderCacheKey } from './utils';
import { RequestUser, ConnectionOptions } from '../types';
import Maybe from 'graphql/tsutils/Maybe';
import { AuthToken, SessionConnectionByKey } from '../db/entity/AuthToken';
import { EMPTY_CONNECTION } from '../db/entity/utils/connection';

const createSessionConnectionByUserIdLoader = createLoader<
  ConnectionOptions,
  SessionConnectionByKey
>(
  async (args, viewer) => {
    // If user is not logged in,
    // we just return empty connections for
    // every args.
    if (!viewer) {
      return args.map((arg) => ({
        key: getDataLoaderCacheKey(arg),
        connection: EMPTY_CONNECTION,
      }));
    }

    const connectionsByKey = await AuthToken.findConnections(
      args as ConnectionOptions[],
      viewer,
    );
    return connectionsByKey;
  },
  (result) => result.key,
);

const sessionLoaders = (viewer: Maybe<RequestUser>) => ({
  sessionConnectionByUserId: createSessionConnectionByUserIdLoader(viewer),
});

export default sessionLoaders;
