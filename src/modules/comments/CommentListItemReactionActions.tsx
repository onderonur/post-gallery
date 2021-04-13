import React from 'react';
import { gql } from '@apollo/client';
import { CommentListItemReactionActions_CommentFragment } from '@src/generated/graphql';
import ReactionActions, {
  ReactionActionsFragments,
} from '@src/modules/reactions/ReactionActions';

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

const CommentListItemReactionActions = React.memo<CommentListItemReactionActionsProps>(
  function CommentListItemReactionActions({ comment }) {
    return <ReactionActions reactable={comment} size="small" />;
  },
);

export default CommentListItemReactionActions;
