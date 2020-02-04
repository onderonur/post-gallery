import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  scalar Cursor

  interface MutationResponse {
    success: Boolean!
    message: String
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
    edges: [PostEdge!]!
  }

  type Viewer {
    id: ID!
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    post(id: ID!): Post
    posts(first: Int, after: Cursor): PostConnection!
    viewer: Viewer!
  }

  input CreatePostInput {
    title: String!
    medias: [Upload!]!
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

  enum MediaOwner {
    POST
  }

  type Media {
    id: ID!
    thumbnailWidth: Int!
    thumbnailHeight: Int!
    thumbnailURL: String!
    smallWidth: Int!
    smallHeight: Int!
    smallURL: String!
    standardWidth: Int!
    standardHeight: Int!
    standardURL: String!
    owner: MediaOwner!
  }

  type PostMedia {
    id: ID!
    media: Media!
  }

  type Post {
    id: ID!
    title: String!
    postMedias: [PostMedia!]!
  }
`;

export default typeDefs;
