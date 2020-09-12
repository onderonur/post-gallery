import { Resolvers } from '../generated/graphql';

const viewerResolvers: Resolvers = {
  Query: {
    user: (parent, { id }, { dataSources }) =>
      dataSources.userAPI.findUserById(id),
  },
  Mutation: {
    updateUser: (parent, { id, input }, { dataSources }) =>
      dataSources.userAPI.updateUser(id, input),
    deleteViewerSessions: (parent, args, { dataSources }) =>
      dataSources.authTokenAPI.deleteViewerAuthTokensExceptCurrent(),
    linkViewerSocialAccount: (parent, args, { dataSources }) =>
      dataSources.userAPI.linkViewerSocialAccount(args),
    unlinkViewerSocialAccount: (parent, args, { dataSources }) =>
      dataSources.userAPI.unlinkViewerSocialAccount(args),
  },
  User: {
    postsCount: ({ id }, args, { dataSources }) =>
      dataSources.postAPI.countPostsByUserId(id),
    posts: ({ id }, args, { dataSources }) =>
      dataSources.postAPI.findPostConnection({ ...args, authorId: id }),
    sessions: async ({ id }, args, { dataSources }) =>
      dataSources.authTokenAPI.findAuthTokenConnectionByUserId({
        ...args,
        userId: id,
      }),
  },
};

export default viewerResolvers;
