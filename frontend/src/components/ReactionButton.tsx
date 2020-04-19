import React from "react";
import { ViewerReactionType, Maybe } from "@/generated/graphql";
import BaseButton, { BaseButtonProps } from "@/components/BaseButton";

export interface ReactionButtonProps {
  size?: BaseButtonProps["size"];
  viewerReaction: Maybe<ViewerReactionType>;
  reactionType: ViewerReactionType;
  activeColor: BaseButtonProps["color"];
  startIcon: BaseButtonProps["startIcon"];
  reactionCount: number;
  onReact: VoidFunction;
  onRemoveReaction: VoidFunction;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({
  size,
  viewerReaction,
  reactionType,
  activeColor,
  startIcon,
  reactionCount,
  onReact,
  onRemoveReaction,
}) => {
  const matchingReactionType = viewerReaction === reactionType;

  return (
    <BaseButton
      startIcon={startIcon}
      variant="text"
      size={size}
      color={matchingReactionType ? activeColor : "default"}
      onClick={matchingReactionType ? onRemoveReaction : onReact}
      isAuthRequired
    >
      {reactionCount}
    </BaseButton>
  );
};

export default ReactionButton;
