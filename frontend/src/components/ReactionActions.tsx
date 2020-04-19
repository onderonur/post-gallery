import React from "react";
import {
  ViewerReactionType,
  useAddReactionMutation,
  useRemoveReactionMutation,
  AddReactionPayload,
  RemoveReactionPayload,
  ReactionActions_ReactableFragment,
} from "@/generated/graphql";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import FlexRow from "@/components/FlexRow";
import ReactionButton, { ReactionButtonProps } from "./ReactionButton";
import { CacheProxy } from "@/types";
import produce from "immer";
import gql from "graphql-tag";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";

const { Like, Dislike } = ViewerReactionType;

export const ReactionActionsFragments = {
  reactable: gql`
    fragment ReactionActions_reactable on Reactable {
      id
      viewerReaction
      reactions {
        likeCount
        dislikeCount
      }
    }
  `,
};

const ADD_REACTION = gql`
  mutation AddReaction($reactableId: ID!, $type: ViewerReactionType!) {
    addReaction(reactableId: $reactableId, type: $type) {
      reactableId
      viewerReaction
    }
  }
`;

const REMOVE_REACTION = gql`
  mutation RemoveReaction($reactableId: ID!) {
    removeReaction(reactableId: $reactableId) {
      reactableId
      viewerReaction
    }
  }
`;

const updateReactableFragment = (
  cache: CacheProxy,
  reactable: ReactionActions_ReactableFragment,
  response: AddReactionPayload | RemoveReactionPayload,
) => {
  const cacheKey = defaultDataIdFromObject(reactable);

  if (!cacheKey) {
    return;
  }

  const fragment = ReactionActionsFragments.reactable;
  const prevData = cache.readFragment<ReactionActions_ReactableFragment>({
    id: cacheKey,
    fragment,
  });

  if (!prevData) {
    return;
  }

  const prevViewerReaction = prevData.viewerReaction;
  const prevReactions = prevData.reactions;
  const { viewerReaction } = response;

  const reactions = produce(prevReactions, (draft) => {
    // Reverting the reaction counts according to the previous reaction
    switch (prevViewerReaction) {
      case Like:
        draft.likeCount--;
        break;
      case Dislike:
        draft.dislikeCount--;
        break;
    }

    // Calculating the reaction counts according to the new reaction
    switch (viewerReaction) {
      case Like:
        draft.likeCount++;
        break;
      case Dislike:
        draft.dislikeCount++;
        break;
    }
  });

  const newData = produce(prevData, (draft) => {
    draft.reactions = reactions;
    draft.viewerReaction = viewerReaction;
  });

  cache.writeFragment({
    id: cacheKey,
    fragment,
    data: newData,
  });
};

export interface ReactionActionsProps {
  reactable: ReactionActions_ReactableFragment;
  size?: ReactionButtonProps["size"];
}

const ReactionActions: React.FC<ReactionActionsProps> = ({
  reactable,
  size,
}) => {
  const reactableId = reactable.id;
  const [addReaction] = useAddReactionMutation({
    mutation: ADD_REACTION,
    optimisticResponse: (variables) => ({
      addReaction: {
        __typename: "AddReactionPayload",
        reactableId,
        viewerReaction: variables.type,
      },
    }),
    update: (cache, { data }) => {
      const addReaction = data?.addReaction;
      if (addReaction) {
        updateReactableFragment(cache, reactable, addReaction);
      }
    },
  });

  const [removeReaction] = useRemoveReactionMutation({
    mutation: REMOVE_REACTION,
    variables: { reactableId },
    optimisticResponse: {
      removeReaction: {
        __typename: "RemoveReactionPayload",
        reactableId,
        viewerReaction: null,
      },
    },
    update: (cache, { data }) => {
      const removeReaction = data?.removeReaction;
      if (removeReaction) {
        updateReactableFragment(cache, reactable, removeReaction);
      }
    },
  });

  const sharedProps = {
    size,
    viewerReaction: reactable.viewerReaction,
    onRemoveReaction: removeReaction,
  };

  return (
    <FlexRow>
      <ReactionButton
        startIcon={<ThumbUpOutlinedIcon />}
        activeColor="primary"
        onReact={() => addReaction({ variables: { reactableId, type: Like } })}
        reactionType={Like}
        reactionCount={reactable.reactions.likeCount}
        {...sharedProps}
      />
      <ReactionButton
        startIcon={<ThumbDownOutlinedIcon />}
        activeColor="secondary"
        onReact={() =>
          addReaction({ variables: { reactableId, type: Dislike } })
        }
        reactionType={Dislike}
        reactionCount={reactable.reactions.dislikeCount}
        {...sharedProps}
      />
    </FlexRow>
  );
};

export default ReactionActions;
