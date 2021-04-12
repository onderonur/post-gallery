import { gql } from 'apollo-server-micro';
import scalarsSchema from '../scalars/scalar.schema';
import postSchema from '../posts/post.schema';
import connectionSchema from '../shared/connection.schema';
import commentSchema from '../comments/comment.schema';
import reactionSchema from '../reactions/reaction.schema';
import userSchema from '../users/user.schema';
import categorySchema from '@api/categories/category.schema';
import authSchema from '@api/auth/auth.schema';

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
  postSchema,
  commentSchema,
  reactionSchema,
  userSchema,
  authSchema,
];

export default schema;
