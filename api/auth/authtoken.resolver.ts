import { Resolvers } from '../generated/graphql';

const authResolvers: Resolvers = {
  Mutation: {
    deleteViewerSessions: (parent, args, { dataSources }) =>
      dataSources.authTokenAPI.deleteViewerAuthTokensExceptCurrent(),
  },
};

export default authResolvers;
