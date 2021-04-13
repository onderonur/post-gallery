import { gql } from 'apollo-server-micro';

const userSchema = gql`
  extend type Query {
    user(id: ID!): User
  }

  extend type Mutation {
    updateUser(id: ID!, input: UserInput!): User!
  }

  input UserInput {
    displayName: String!
    email: EmailAddress!
  }

  type User {
    id: ID!
    displayName: String!
    email: EmailAddress!
    thumbnailUrl: String
    googleProfileId: String
    facebookProfileId: String
    postsCount: NonNegativeInt!
    posts(first: NonNegativeInt!, after: Cursor): PostConnection!
    sessions(first: NonNegativeInt!, after: Cursor): SessionConnection!
  }
`;

export default userSchema;
