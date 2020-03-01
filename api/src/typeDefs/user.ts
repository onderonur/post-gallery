import { gql } from 'apollo-server-express';

const userSchema = gql`
  extend type Query {
    user(id: ID!): User
  }

  type User {
    id: ID!
    displayName: String!
    email: String
    thumbnailUrl: String
    posts(first: Int = 10, after: Cursor): PostConnection
  }
`;

export default userSchema;
