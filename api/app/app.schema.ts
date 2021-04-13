import { gql } from 'apollo-server-micro';
import scalarsSchema from '@api/scalars/scalar.schema';
import postSchema from '@api/posts/post.schema';
import connectionSchema from '@api/shared/connection.schema';
import commentSchema from '@api/comments/comment.schema';
import reactionSchema from '@api/reactions/reaction.schema';
import userSchema from '@api/users/user.schema';
import categorySchema from '@api/categories/category.schema';
import authSchema from '@api/auth/authtoken.schema';
import mediaSchema from '@api/media/media.schema';

const linkSchema = gql`
  type Query {
    _: Boolean!
  }

  type Mutation {
    _: Boolean!
  }
`;

const schema = [
  linkSchema,
  scalarsSchema,
  connectionSchema,
  categorySchema,
  mediaSchema,
  postSchema,
  commentSchema,
  reactionSchema,
  userSchema,
  authSchema,
];

export default schema;
