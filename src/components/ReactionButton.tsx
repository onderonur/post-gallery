import React from 'react';
import { ReactionType, Maybe } from '@src/generated/graphql';
import BaseButton, { BaseButtonProps } from '@src/components/BaseButton';

export interface ReactionButtonProps {
  size?: BaseButtonProps['size'];
  viewerReaction: Maybe<ReactionType>;
  reactionType: ReactionType;
  activeColor: BaseButtonProps['color'];
  startIcon: BaseButtonProps['startIcon'];
  reactionsCount: number;
  onAddReaction: VoidFunction;
  onRemoveReaction: VoidFunction;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({
  size,
  viewerReaction,
  reactionType,
  activeColor,
  startIcon,
  reactionsCount,
  onAddReaction,
  onRemoveReaction,
}) => {
  const matchingReactionType = viewerReaction === reactionType;

  return (
    <BaseButton
      startIcon={startIcon}
      variant="text"
      size={size}
      color={matchingReactionType ? activeColor : 'default'}
      onClick={matchingReactionType ? onRemoveReaction : onAddReaction}
      isAuthRequired
    >
      {reactionsCount}
    </BaseButton>
  );
};

export default ReactionButton;
