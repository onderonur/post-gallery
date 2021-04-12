import { Resolvers } from '../generated/graphql';

const authResolvers: Resolvers = {
  Mutation: {
    deleteViewerSessions: (parent, args, { dataSources }) =>
      dataSources.authAPI.deleteViewerAuthTokensExceptCurrent(),
  },
};

export default authResolvers;
