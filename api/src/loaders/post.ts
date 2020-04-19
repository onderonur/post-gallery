import { createLoader } from './utils';
import { Post, PostConnectionByKey } from '../db/entity/Post';
import { ConnectionOptions, RequestUser } from '../types';
import Maybe from 'graphql/tsutils/Maybe';

const createPostConnectionLoader = createLoader<
  ConnectionOptions,
  PostConnectionByKey
>(
  (args) => Post.findConnections(args as ConnectionOptions[]),
  (result) => result.key,
);

const postLoaders = (viewer: Maybe<RequestUser>) => ({
  postConnection: createPostConnectionLoader(viewer),
});

export default postLoaders;
