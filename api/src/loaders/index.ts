import { RequestUser } from '../types';
import Maybe from 'graphql/tsutils/Maybe';
import userLoaders from './user';
import reactionLoaders from './reaction';
import postLoaders from './post';
import mediaLoaders from './media';
import commentLoaders from './comment';

export const createLoaders = (viewer: Maybe<RequestUser>) => {
  return {
    user: userLoaders(viewer),
    reaction: reactionLoaders(viewer),
    post: postLoaders(viewer),
    media: mediaLoaders(viewer),
    comment: commentLoaders(viewer),
  };
};

export type Loaders = ReturnType<typeof createLoaders>;
