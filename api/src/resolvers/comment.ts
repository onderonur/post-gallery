import { Resolvers } from '../generated/graphql';

const commentResolvers: Resolvers = {
  Mutation: {
    addPostComment: (parent, { input }, { dataSources }) =>
      dataSources.commentAPI.addPostComment(input),
    removePostComment: (parent, { id }, { dataSources }) =>
      dataSources.commentAPI.removePostComment(id),
  },
  Comment: {
    commenter: ({ userId }, args, { dataSources }) =>
      dataSources.userAPI.loadUserById(userId),
    reactions: ({ id }, args, { dataSources }) =>
      dataSources.reactionAPI.loadReactions(id),
    viewerReaction: async ({ id }, args, { dataSources }) => {
      const reaction = await dataSources.reactionAPI.loadViewerReaction(id);
      return reaction?.type;
    },
  },
};

export default commentResolvers;
