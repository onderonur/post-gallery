import { gql } from 'apollo-server-express';
import scalarsSchema from './scalars';
import postSchema from './post';
import connectionSchema from './connection';
import commentSchema from './comment';
import reactionSchema from './reaction';
import userSchema from './user';

const linkSchema = gql`
  type Query {
    _: Boolean!
  }

  type Mutation {
    _: Boolean!
  }
`;

export default [
  linkSchema,
  scalarsSchema,
  connectionSchema,
  postSchema,
  commentSchema,
  reactionSchema,
  userSchema,
];
