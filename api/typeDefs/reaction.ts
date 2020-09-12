import { gql } from 'apollo-server-micro';

const reactionSchema = gql`
  extend type Mutation {
    addReaction(reactableId: ID!, type: ReactionType!): AddReactionPayload!
    removeReaction(reactableId: ID!): RemoveReactionPayload!
  }

  enum ReactionType {
    LIKE
    DISLIKE
  }

  type AddReactionPayload {
    reactableId: ID!
    viewerReaction: ReactionType!
  }

  type RemoveReactionPayload {
    reactableId: ID!
    viewerReaction: ReactionType
  }

  interface Reactable {
    id: ID!
    viewerReaction: ReactionType
    reactionsCount: ReactionsCount!
  }

  type ReactionsCount {
    likesCount: Int!
    dislikesCount: Int!
  }
`;

export default reactionSchema;
