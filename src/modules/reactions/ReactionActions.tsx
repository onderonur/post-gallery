import React, { useCallback } from 'react';
import {
  ReactionType,
  useAddReactionMutation,
  useRemoveReactionMutation,
  AddReactionPayload,
  RemoveReactionPayload,
  ReactionActions_ReactableFragment,
  AddReactionMutation,
  RemoveReactionMutation,
} from '@src/generated/graphql';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ReactionButton, { ReactionButtonProps } from './ReactionButton';
import produce from 'immer';
import { ApolloCache, gql } from '@apollo/client';
import FlexRow from '@src/modules/shared/FlexRow';

const { Like, Dislike } = ReactionType;

export const ReactionActionsFragments = {
  reactable: gql`
    fragment ReactionActions_reactable on Reactable {
      id
      viewerReaction
      reactionsCount {
        likesCount
        dislikesCount
      }
    }
  `,
};

const ADD_REACTION = gql`
  mutation AddReaction($reactableId: ID!, $type: ReactionType!) {
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
  cache: ApolloCache<AddReactionMutation | RemoveReactionMutation>,
  reactable: ReactionActions_ReactableFragment,
  response: AddReactionPayload | RemoveReactionPayload,
) => {
  const cacheKey = cache.identify(reactable);

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
  const prevReactionsCount = prevData.reactionsCount;
  const { viewerReaction } = response;

  const reactionsCount = produce(prevReactionsCount, (draft) => {
    // Reverting the reaction counts according to the previous reaction
    switch (prevViewerReaction) {
      case Like:
        draft.likesCount--;
        break;
      case Dislike:
        draft.dislikesCount--;
        break;
    }

    // Calculating the reaction counts according to the new reaction
    switch (viewerReaction) {
      case Like:
        draft.likesCount++;
        break;
      case Dislike:
        draft.dislikesCount++;
        break;
    }
  });

  const newData = produce(prevData, (draft) => {
    draft.reactionsCount = reactionsCount;
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
  size?: ReactionButtonProps['size'];
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
        __typename: 'AddReactionPayload',
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
        __typename: 'RemoveReactionPayload',
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

  const sharedProps: Pick<
    ReactionButtonProps,
    'size' | 'viewerReaction' | 'onRemoveReaction'
  > = {
    size,
    viewerReaction: reactable.viewerReaction,
    onRemoveReaction: removeReaction,
  };

  const handleReact = useCallback(
    (reactionType: ReactionType) => () => {
      addReaction({
        variables: { reactableId, type: reactionType },
      });
    },
    [addReaction, reactableId],
  );

  return (
    <FlexRow>
      <ReactionButton
        startIcon={<ThumbUpOutlinedIcon />}
        activeColor="primary"
        onAddReaction={handleReact(Like)}
        reactionType={Like}
        reactionsCount={reactable.reactionsCount.likesCount}
        {...sharedProps}
      />
      <ReactionButton
        startIcon={<ThumbDownOutlinedIcon />}
        activeColor="secondary"
        onAddReaction={handleReact(Dislike)}
        reactionType={Dislike}
        reactionsCount={reactable.reactionsCount.dislikesCount}
        {...sharedProps}
      />
    </FlexRow>
  );
};

export default ReactionActions;
