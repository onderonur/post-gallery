import { Resolvers } from '../generated/graphql';

const viewerResolvers: Resolvers = {
  Query: {
    user: (parent, { id }, { dataSources }) =>
      dataSources.userAPI.loadUserById(id),
  },
  User: {
    posts: ({ id }, args, { dataSources }) =>
      dataSources.postAPI.findPostConnection({ ...args, authorId: id }),
  },
};

export default viewerResolvers;
