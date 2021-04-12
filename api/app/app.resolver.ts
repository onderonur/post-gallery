import { Resolvers } from '../generated/graphql';
import merge from 'lodash/merge';
import scalarResolvers from '@api/scalars/scalar.resolver';
import viewerResolvers from '../auth/viewer.resolver';
import postResolvers from '../posts/post.resolver';
import commentResolvers from '../comments/comment.resolver';
import reactionResolvers from '../reactions/reaction.resolver';
import userResolvers from '../users/user.resolver';
import categoryResolvers from '../categories/category.resolver';
import authResolvers from '@api/auth/auth.resolver';

const resolvers: Resolvers = merge(
  {},
  scalarResolvers,
  postResolvers,
  viewerResolvers,
  commentResolvers,
  reactionResolvers,
  userResolvers,
  authResolvers,
  categoryResolvers,
);

export default resolvers;
