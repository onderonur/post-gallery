import { Resolvers } from '../generated/graphql';

const postResolvers: Resolvers = {
  Query: {
    post: (parent, { id }, { dataSources }) =>
      dataSources.postAPI.findPostById(id),
    posts: (parent, args, { dataSources }) =>
      dataSources.postAPI.findPostConnection(args),
  },
  Post: {
    reactions: ({ id }, args, { dataSources }) =>
      dataSources.reactionAPI.loadReactions(id),
    media: async ({ id }, args, { dataSources }) =>
      dataSources.mediaAPI.loadMediaByPostId(id),
    author: async (parent, args, { dataSources }) =>
      dataSources.userAPI.loadUserById(parent.userId),
    viewerReaction: async ({ id }, args, { dataSources }) => {
      const reaction = await dataSources.reactionAPI.loadViewerReaction(id);
      return reaction?.type;
    },
    comments: async ({ id }, { first, after }, { dataSources }) =>
      dataSources.commentAPI.findCommentConnectionByPostId(id, {
        first,
        after,
      }),
  },
  Mutation: {
    createPost: async (parent, { input }, { dataSources }) => {
      const { postAPI, mediaAPI } = dataSources;
      const { media } = input;
      const savedMedia = await mediaAPI.uploadSingleMedia(media);
      const { title } = input;
      const post = await postAPI.createPost({ title, media: savedMedia });
      return post;
    },
    deletePost: (parent, { id }, { dataSources }) =>
      dataSources.postAPI.deletePost(id),
  },
};

export default postResolvers;
