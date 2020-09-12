import { gql } from 'apollo-server-micro';

const userSchema = gql`
  extend type Query {
    user(id: ID!): User
    viewer: User
  }

  enum SocialAccountType {
    FACEBOOK
    GOOGLE
  }

  extend type Mutation {
    updateUser(id: ID!, input: UserInput!): User!
    deleteViewerSessions: Boolean!
    linkViewerSocialAccount(
      socialAccountType: SocialAccountType!
      token: String!
    ): User!
    unlinkViewerSocialAccount(socialAccountType: SocialAccountType!): User!
  }

  input UserInput {
    displayName: String!
    email: String!
  }

  type User {
    id: ID!
    displayName: String!
    email: String!
    thumbnailUrl: String
    googleProfileId: String
    facebookProfileId: String
    postsCount: Int!
    posts(first: Int!, after: Cursor): PostConnection!
    sessions(first: Int!, after: Cursor): SessionConnection!
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
    pageInfo: PageInfo!
    edges: [SessionEdge!]!
  }
`;

export default userSchema;
