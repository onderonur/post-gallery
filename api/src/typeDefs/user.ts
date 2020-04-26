import { gql } from 'apollo-server-express';

const userSchema = gql`
  extend type Query {
    user(id: ID!): User
    viewer: User
  }

  extend type Mutation {
    updateUser(input: UpdateUserInput!): User!
  }

  input UpdateUserInput {
    id: ID!
    displayName: String!
    email: String!
  }

  type User {
    id: ID!
    displayName: String!
    email: String!
    thumbnailUrl: String
    posts(first: Int = 10, after: Cursor): PostConnection
    sessions(first: Int = 10, after: Cursor): SessionConnection
  }

  type Session {
    id: ID!
    browser: String
    platform: String
    os: String
    createdAt: Date!
    isCurrent: Boolean!
  }

  type SessionEdge {
    node: Session!
    cursor: Cursor!
  }

  type SessionConnection implements Connection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [SessionEdge!]!
  }
`;

export default userSchema;
