import { createLoader } from './utils';
import {
  Comment,
  CommentConnectionOptions,
  CommentConnectionByKey,
} from '../db/entity/Comment';
import { RequestUser } from '../types';
import Maybe from 'graphql/tsutils/Maybe';

const createCommentConnectionByPostIdLoader = createLoader<
  CommentConnectionOptions,
  CommentConnectionByKey
>(
  args => Comment.findConnections(args as CommentConnectionOptions[]),
  result => result.key,
);

const commentLoaders = (viewer: Maybe<RequestUser>) => ({
  commentConnectionByPostId: createCommentConnectionByPostIdLoader(viewer),
});

export default commentLoaders;
