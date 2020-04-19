import React from "react";
import { PostReactionActions_PostFragment } from "@/generated/graphql";
import ReactionActions, { ReactionActionsFragments } from "./ReactionActions";
import gql from "graphql-tag";

export const PostReactionActionsFragments = {
  post: gql`
    fragment PostReactionActions_post on Post {
      ...ReactionActions_reactable
    }
    ${ReactionActionsFragments.reactable}
  `,
};

interface PostReactionActionsProps {
  post: PostReactionActions_PostFragment;
}

const PostReactionActions: React.FC<PostReactionActionsProps> = ({ post }) => {
  return <ReactionActions reactable={post} />;
};

export default PostReactionActions;
