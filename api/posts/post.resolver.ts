import { Resolvers } from '../generated/graphql';

const postResolvers: Resolvers = {
  Query: {
    post: (parent, { id }, { dataSources }) =>
      dataSources.postAPI.findOnePostById(id),
    posts: (parent, args, { dataSources }) =>
      dataSources.postAPI.findPostConnection(args),
  },
  Post: {
    reactionsCount: ({ id }, args, { dataSources }) =>
      dataSources.reactionAPI.countReactionsByReactableId(id),
    media: ({ id }, args, { dataSources }) =>
      dataSources.mediaAPI.findOneMediaByPostId(id),
    author: (parent, args, { dataSources }) =>
      dataSources.userAPI.findOneUserById(parent.userId),
    viewerReaction: ({ id }, args, { dataSources }) =>
      dataSources.reactionAPI.findOneViewerReaction(id),
    commentsCount: ({ id }, args, { dataSources }) =>
      dataSources.commentAPI.countCommentsByPostId(id),
    comments: ({ id }, { first, after }, { dataSources }) =>
      dataSources.commentAPI.findCommentConnectionByPostId(id, {
        first,
        after,
      }),
  },
  Mutation: {
    createPost: (parent, { input }, { dataSources }) =>
      dataSources.postAPI.createPost(input),
    deletePost: (parent, { id }, { dataSources }) =>
      dataSources.postAPI.deletePost(id),
  },
};

export default postResolvers;
