import { ID, RequestUser } from '../types';
import { createLoader } from './utils';
import { Reaction, ReactableReactions } from '../db/entity/Reaction';
import { In } from 'typeorm';
import Maybe from 'graphql/tsutils/Maybe';

const createViewerReactionByReactableIdLoader = createLoader<ID, Reaction>(
  async (reactableIds, viewer) => {
    // User is not logged in.
    // So there are no "viewer" reactions.
    if (!viewer) {
      return [];
    }

    const reactions = await Reaction.find({
      where: {
        reactableId: In(reactableIds as ID[]),
        userId: viewer.id,
      },
    });

    return reactions;
  },
  (reaction) => reaction.reactableId,
);

const createReactionsByReactableIdLoader = createLoader<ID, ReactableReactions>(
  (reactableIds) => Reaction.findReactionsByReactableIds(reactableIds as ID[]),
  (reaction) => reaction.reactableId,
);

const reactionLoaders = (viewer: Maybe<RequestUser>) => ({
  viewerReactionByReactableId: createViewerReactionByReactableIdLoader(viewer),
  reactionsByReactableId: createReactionsByReactableIdLoader(viewer),
});

export default reactionLoaders;
