import { gql } from 'apollo-server-express';

const postSchema = gql`
  extend type Query {
    post(id: ID!): Post
    posts(first: Int = 10, after: Cursor): PostConnection!
  }

  extend type Mutation {
    createPost(input: CreatePostInput!): Post
    deletePost(id: ID!): Boolean!
  }

  type Post implements Reactable {
    id: ID!
    title: String!
    createdAt: Date!
    media: Media
    author: User
    viewerReaction: ViewerReactionType
    reactions: Reactions!
    comments(first: Int = 10, after: Cursor): CommentConnection!
  }

  type Image {
    width: Int!
    height: Int!
    Url: String!
  }

  type Media {
    id: ID!
    thumbnail: Image!
    smallImage: Image!
    standardImage: Image!
  }

  type PostEdge {
    node: Post!
    cursor: Cursor!
  }

  type PostConnection implements Connection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [PostEdge!]!
  }

  input CreatePostInput {
    title: String!
    media: Upload!
  }
`;

export default postSchema;
