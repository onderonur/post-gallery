import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  scalar Cursor

  interface MutationResponse {
    success: Boolean!
    message: String
  }

  type PaginationOptions {
    first: Int
    after: Cursor
  }

  type PageInfo {
    endCursor: Cursor
    hasNextPage: Boolean!
  }

  type PostEdge {
    node: Post!
    cursor: Cursor!
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

  input CreatePostInput {
    title: String!
  }

  type CreatePostMutationsResponse implements MutationResponse {
    success: Boolean!
    message: String
    post: Post
  }

  type DeletePostMutationResponse implements MutationResponse {
    success: Boolean!
    message: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): CreatePostMutationsResponse!
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
