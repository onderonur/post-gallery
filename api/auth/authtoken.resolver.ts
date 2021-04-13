import { Resolvers } from '../generated/graphql';

const authResolvers: Resolvers = {
  Query: {
    viewer: (parent, args, { viewer }) => viewer,
  },
  Mutation: {
    deleteViewerSessions: (parent, args, { dataSources }) =>
      dataSources.authTokenAPI.deleteViewerAuthTokensExceptCurrent(),
    linkViewerSocialAccount: (parent, args, { dataSources }) =>
      dataSources.userAPI.linkViewerSocialAccount(args),
    unlinkViewerSocialAccount: (parent, args, { dataSources }) =>
      dataSources.userAPI.unlinkViewerSocialAccount(args),
  },
};

export default authResolvers;
