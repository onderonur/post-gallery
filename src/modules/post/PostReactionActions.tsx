import React from 'react';
import { PostReactionActions_PostFragment } from '@src/generated/graphql';
import ReactionActions, {
  ReactionActionsFragments,
} from '../reactions/ReactionActions';
import { gql } from '@apollo/client';

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
