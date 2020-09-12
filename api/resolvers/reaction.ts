import { Resolvers } from '../generated/graphql';

const reactionResolvers: Resolvers = {
  Mutation: {
    addReaction: (parent, { reactableId, type }, { dataSources }) =>
      dataSources.reactionAPI.addReaction(reactableId, type),
    removeReaction: (parent, { reactableId }, { dataSources }) =>
      dataSources.reactionAPI.removeReaction(reactableId),
  },
};

export default reactionResolvers;
