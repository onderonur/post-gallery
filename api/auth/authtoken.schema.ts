import { gql } from 'apollo-server-micro';

const authSchema = gql`
  extend type Query {
    viewer: User
  }

  extend type Mutation {
    linkViewerSocialAccount(
      socialAccountType: SocialAccountType!
      token: String!
    ): User!
    unlinkViewerSocialAccount(socialAccountType: SocialAccountType!): User!
  }

  enum SocialAccountType {
    FACEBOOK
    GOOGLE
  }

  extend type Mutation {
    deleteViewerSessions: Boolean!
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

export default authSchema;
