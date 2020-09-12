import { gql } from 'apollo-server-micro';

const postSchema = gql`
  extend type Query {
    post(id: ID!): Post
    posts(first: Int!, after: Cursor): PostConnection!
    categories: [Category!]!
    category(slug: String!): Category
  }

  extend type Mutation {
    createPost(input: PostInput!): Post
    deletePost(id: ID!): Boolean!
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
    posts(first: Int!, after: Cursor): PostConnection!
  }

  type Post implements Reactable {
    id: ID!
    title: String!
    createdAt: Date!
    media: GraphMedia
    author: User
    viewerReaction: ReactionType
    reactionsCount: ReactionsCount!
    commentsCount: Int!
    comments(first: Int!, after: Cursor): CommentConnection!
  }

  type GraphImage {
    width: Int!
    height: Int!
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
