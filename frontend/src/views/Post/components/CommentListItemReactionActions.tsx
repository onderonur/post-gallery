import React from "react";
import gql from "graphql-tag";
import { CommentListItemReactionActions_CommentFragment } from "@/generated/graphql";
import ReactionActions, {
  ReactionActionsFragments,
} from "@/components/ReactionActions";

export const CommentListItemReactionActionsFragments = {
  comment: gql`
    fragment CommentListItemReactionActions_comment on Comment {
      ...ReactionActions_reactable
    }
    ${ReactionActionsFragments.reactable}
  `,
};

export interface CommentListItemReactionActionsProps {
  comment: CommentListItemReactionActions_CommentFragment;
}

const CommentListItemReactionActions = React.memo<
  CommentListItemReactionActionsProps
>(({ comment }) => {
  return <ReactionActions reactable={comment} size="small" />;
});

export default CommentListItemReactionActions;
