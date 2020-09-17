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
      dataSources.userAPI.findOneUserById(userId),
    reactionsCount: ({ id }, args, { dataSources }) =>
      dataSources.reactionAPI.countReactionsByReactableId(id),
    viewerReaction: ({ id }, args, { dataSources }) =>
      dataSources.reactionAPI.findOneViewerReaction(id),
  },
};

export default commentResolvers;
