import { Resolvers } from '../generated/graphql';
import merge from 'lodash/merge';
import scalars from './scalars';
import viewerResolvers from './viewer';
import postResolvers from './post';
import commentResolvers from './comment';
import reactionResolvers from './reaction';
import userResolvers from './user';

const resolvers: Resolvers = merge(
  {},
  scalars,
  postResolvers,
  viewerResolvers,
  commentResolvers,
  reactionResolvers,
  userResolvers,
);

export default resolvers;
