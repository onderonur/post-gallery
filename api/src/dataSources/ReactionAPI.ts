import BaseDataSource from './BaseDataSource';
import { ID } from '../types';
import { ViewerReactionType } from '../generated/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { Reaction, ReactableReactions } from '../db/entity/Reaction';

class ReactionAPI extends BaseDataSource {
  async addReaction(reactableId: ID, type: ViewerReactionType) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('invalid_credentials');
    }

    let reaction = await this.loadViewerReaction(reactableId);

    // User already reacted to the reactable
    // We will update the reaction
    if (reaction) {
      reaction.type = type;
    } else {
      // User reacts to the reactable for the first time
      reaction = new Reaction();
      reaction.userId = viewer.id;
      reaction.reactableId = reactableId;
      reaction.type = type;
    }

    await reaction.save();

    return { reactableId, viewerReaction: type };
  }

  async removeReaction(reactableId: ID) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('invalid_credentials');
    }

    await Reaction.delete({
      reactableId,
      userId: viewer.id,
    });

    return { reactableId, viewerReaction: null };
  }

  async loadViewerReaction(reactableId: ID) {
    const { loaders } = this.context;
    const reaction = await loaders.reaction.viewerReactionByReactableId.load(
      reactableId,
    );
    return reaction;
  }

  async loadReactions(reactableId: ID): Promise<ReactableReactions> {
    const { loaders } = this.context;
    const reactions = await loaders.reaction.reactionsByReactableId.load(
      reactableId,
    );
    return reactions || { reactableId, likeCount: 0, dislikeCount: 0 };
  }
}

export default ReactionAPI;
