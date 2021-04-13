import { Resolvers } from '@api/generated/graphql';
import merge from 'lodash/merge';
import scalarResolvers from '@api/scalars/scalar.resolver';
import viewerResolvers from '@api/auth/viewer.resolver';
import postResolvers from '@api/posts/post.resolver';
import commentResolvers from '@api/comments/comment.resolver';
import reactionResolvers from '@api/reactions/reaction.resolver';
import userResolvers from '@api/users/user.resolver';
import categoryResolvers from '@api/categories/category.resolver';
import authResolvers from '@api/auth/authtoken.resolver';

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
