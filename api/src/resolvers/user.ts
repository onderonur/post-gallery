import { Resolvers } from '../generated/graphql';

const viewerResolvers: Resolvers = {
  Query: {
    user: (parent, { id }, { dataSources }) =>
      dataSources.userAPI.loadUserById(id),
  },
  Mutation: {
    updateUser: (parent, { input }, { dataSources }) =>
      dataSources.userAPI.updateUser(input),
  },
  User: {
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
