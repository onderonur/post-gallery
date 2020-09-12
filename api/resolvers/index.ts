import { Resolvers } from '../generated/graphql';
import merge from 'lodash/merge';
import scalarResolvers from './scalars';
import viewerResolvers from './viewer';
import postResolvers from './post';
import commentResolvers from './comment';
import reactionResolvers from './reaction';
import userResolvers from './user';
import categoryResolvers from './category';

const resolvers: Resolvers = merge(
  {},
  scalarResolvers,
  postResolvers,
  viewerResolvers,
  commentResolvers,
  reactionResolvers,
  userResolvers,
  categoryResolvers,
);

export default resolvers;
