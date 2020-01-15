import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  interface MutationResponse {
    success: Boolean!
    message: String
  }

  # TODO: Create scalar "cursor" type
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
  }

  type PostEdge {
    node: Post!
    cursor: String!
  }

  type PostConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [PostEdge]!
  }

  type Query {
    post(id: ID!): Post
    posts: PostConnection!
  }

  type DeletePostMutationResponse implements MutationResponse {
    success: Boolean!
    message: String
  }

  type Mutation {
    deletePost(id: ID!): DeletePostMutationResponse!
  }

  type Post {
    id: ID!
    title: String!
    postFiles: [PostFile]!
  }

  type PostFile {
    id: ID!
    filename: String!
    filepath: String!
    mimetype: String!
    encoding: String!
  }
`;

export default typeDefs;
