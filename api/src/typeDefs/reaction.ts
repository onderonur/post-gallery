import { gql } from 'apollo-server-express';

const reactionSchema = gql`
  extend type Mutation {
    addReaction(
      reactableId: ID!
      type: ViewerReactionType!
    ): AddReactionPayload!
    removeReaction(reactableId: ID!): RemoveReactionPayload!
  }

  enum ViewerReactionType {
    LIKE
    DISLIKE
  }

  type AddReactionPayload {
    reactableId: ID!
    viewerReaction: ViewerReactionType!
  }

  type RemoveReactionPayload {
    reactableId: ID!
    viewerReaction: ViewerReactionType
  }

  interface Reactable {
    id: ID!
    viewerReaction: ViewerReactionType
    reactions: Reactions!
  }

  type Reactions {
    likeCount: Int!
    dislikeCount: Int!
  }
`;

export default reactionSchema;
