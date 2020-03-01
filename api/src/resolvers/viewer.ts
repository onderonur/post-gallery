import { Resolvers } from '../generated/graphql';

const viewerResolvers: Resolvers = {
  Query: {
    viewer: (parent, args, { viewer }) => viewer,
  },
};

export default viewerResolvers;
