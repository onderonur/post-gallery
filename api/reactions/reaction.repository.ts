import { AuthenticationError } from 'apollo-server-micro';
import { ID } from '@api/shared/shared.types';
import { ReactionType } from '@api/generated/graphql';
import { ReactionsCount } from '../generated/graphql';
import BaseRepository from '../shared/base.repository';
import { createLoader } from '../db/utils/createLoader';
import { ReactionModel } from './reaction.model';

export type ReactionsCountByReactableId = ReactionsCount & {
  reactableId: ID;
};

interface ReactionKey {
  userId: ID;
  reactableId: ID;
}

const createReactionByReactionKeyLoader = createLoader<
  ReactionKey,
  ReactionModel
>(
  (keys) =>
    ReactionModel.query().whereInComposite(
      ['reactableId', 'userId'],
      keys.map((key) => [key.reactableId, key.userId]),
    ),
  (reaction) => ({
    reactableId: reaction.reactableId,
    userId: reaction.userId,
  }),
);

const createReactionsCountByReactableIdLoader = createLoader<
  ID,
  ReactionsCountByReactableId
>(
  async (reactableIds) => {
    const query = ReactionModel.knexQuery().select('reactableId');
    const reactions: Record<string, ReactionType> = {
      likes: ReactionType.Like,
      dislikes: ReactionType.Dislike,
    };
    for (const key in reactions) {
      const value = reactions[key];
      query.select(
        ReactionModel.knex().raw(
          `COUNT(CASE WHEN "type" = '${value}' THEN 1 ELSE null END) AS "${key}Count"`,
        ),
      );
    }
    const reactionsCounts = await query
      .whereIn('reactableId', reactableIds as ID[])
      .groupBy<ReactionsCountByReactableId[]>('reactableId');
    return reactionsCounts;
  },
  (reactionsCount) => reactionsCount.reactableId,
);

const reactionLoaders = () => ({
  reactionByReactableKey: createReactionByReactionKeyLoader(),
  reactionsCountByReactableId: createReactionsCountByReactableIdLoader(),
});

type ReactionInput = Pick<ReactionModel, 'reactableId' | 'userId' | 'type'>;

class ReactionRepository extends BaseRepository {
  private loaders = reactionLoaders();

  async findOneUserReaction(userId: ID, reactableId: ID) {
    const reaction = await this.loaders.reactionByReactableKey.load({
      userId,
      reactableId,
    });
    return reaction;
  }

  async create(input: ReactionInput) {
    const reaction = await ReactionModel.query().insert(input);
    return reaction;
  }

  async update(id: ID, input: ReactionInput) {
    const reaction = await ReactionModel.query().updateAndFetchById(id, input);
    return reaction;
  }

  async addViewerReaction(args: { reactableId: ID; type: ReactionType }) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('You are not logged in');
    }

    const { reactableId, type } = args;

    let reaction = await this.findOneUserReaction(viewer.id, reactableId);

    // User already reacted to the reactable
    // We will update the reaction
    if (reaction) {
      reaction = await this.update(reaction.id, {
        ...reaction,
        type,
      });
    } else {
      // User reacts to the reactable for the first time
      reaction = await this.create({
        type,
        userId: viewer.id,
        reactableId,
      });
    }

    return { reactableId, viewerReaction: reaction.type };
  }

  async removeViewerReaction(reactableId: ID) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('You are not logged in');
    }

    await ReactionModel.query()
      .whereComposite(['reactableId', 'userId'], [reactableId, viewer.id])
      .delete();

    return { reactableId, viewerReaction: null };
  }

  async countByReactableId(reactableId: ID) {
    let reactionsCount = await this.loaders.reactionsCountByReactableId.load(
      reactableId,
    );
    reactionsCount = reactionsCount || {
      likesCount: 0,
      dislikesCount: 0,
      reactableId,
    };
    return reactionsCount;
  }
}

export default ReactionRepository;
