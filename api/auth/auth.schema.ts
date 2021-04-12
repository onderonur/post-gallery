import { gql } from 'apollo-server-micro';

const authSchema = gql`
  extend type Query {
    user(id: ID!): User
    viewer: User
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
