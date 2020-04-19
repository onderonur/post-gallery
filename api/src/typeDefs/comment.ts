import { gql } from 'apollo-server-express';

const commentSchema = gql`
  extend type Mutation {
    addPostComment(input: AddPostCommentInput!): CommentEdge
    removePostComment(id: ID!): Boolean!
  }

  input AddPostCommentInput {
    postId: ID!
    text: String!
  }

  type Comment implements Reactable {
    id: ID!
    text: String!
    createdAt: Date!
    commenter: User
    reactions: Reactions!
    viewerReaction: ViewerReactionType
  }

  type CommentEdge {
    node: Comment!
    cursor: Cursor!
  }

  type CommentConnection implements Connection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [CommentEdge!]!
  }
`;

export default commentSchema;
