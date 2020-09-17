import BaseDataSource from './BaseDataSource';
import { ID } from '../types';
import { ReactionType } from '../generated/graphql';

class ReactionAPI extends BaseDataSource {
  async addReaction(reactableId: ID, type: ReactionType) {
    const { db } = this.context;
    const result = await db.reaction.addViewerReaction({
      reactableId,
      type,
    });
    return result;
  }

  async removeReaction(reactableId: ID) {
    const { db } = this.context;
    const result = await db.reaction.removeViewerReaction(reactableId);
    return result;
  }

  async findOneViewerReaction(reactableId: ID) {
    const { db, viewer } = this.context;
    if (!viewer) {
      return null;
    }
    const reaction = await db.reaction.findOneUserReaction(
      viewer.id,
      reactableId,
    );
    return reaction?.type;
  }

  async countReactionsByReactableId(reactableId: ID) {
    const { db } = this.context;
    const reactionsCount = await db.reaction.countByReactableId(reactableId);
    return reactionsCount;
  }
}

export default ReactionAPI;
