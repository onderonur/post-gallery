import { gql } from 'apollo-server-micro';

const postSchema = gql`
  extend type Query {
    post(id: ID!): Post
    posts(first: NonNegativeInt!, after: Cursor): PostConnection!
  }

  extend type Mutation {
    createPost(input: PostInput!): Post
    deletePost(id: ID!): Boolean!
  }

  type Post implements Reactable {
    id: ID!
    title: String!
    createdAt: Date!
    media: GraphMedia
    author: User
    viewerReaction: ReactionType
    reactionsCount: ReactionsCount!
    commentsCount: NonNegativeInt!
    comments(first: NonNegativeInt!, after: Cursor): CommentConnection!
  }

  type GraphImage {
    width: NonNegativeInt!
    height: NonNegativeInt!
    url: String!
  }

  type GraphMedia {
    id: ID!
    thumbnail: GraphImage!
    smallImage: GraphImage!
    standardImage: GraphImage!
  }

  type PostEdge {
    node: Post!
    cursor: Cursor!
  }

  type PostConnection implements Connection {
    pageInfo: PageInfo!
    edges: [PostEdge!]!
  }

  input PostInput {
    title: String!
    categoryId: ID!
    mediaId: ID!
  }
`;

export default postSchema;
