import { Resolvers } from '../generated/graphql';

const userResolvers: Resolvers = {
  Query: {
    user: (parent, { id }, { dataSources }) =>
      dataSources.userAPI.findOneUserById(id),
  },
  Mutation: {
    updateUser: (parent, { id, input }, { dataSources }) =>
      dataSources.userAPI.updateUser(id, input),
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

export default userResolvers;
