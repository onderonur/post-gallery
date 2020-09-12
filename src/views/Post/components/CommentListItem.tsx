import React from 'react';
import dayjs from 'dayjs';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  ListItemAvatar,
  Avatar,
  MenuItem,
} from '@material-ui/core';
import { gql } from '@apollo/client';
import {
  CommentListItem_CommentFragment,
  useRemovePostCommentMutation,
  RemovePostCommentMutationOptions,
} from '@src/generated/graphql';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BaseMenu from '@src/components/BaseMenu';
import BaseIconButton from '@src/components/BaseIconButton';
import { useConfirmDialog } from '@src/contexts/ConfirmDialogContext';
import Loading from '@src/components/Loading';
import { ID } from '@src/types';
import CommentListItemReactionActions, {
  CommentListItemReactionActionsFragments,
} from './CommentListItemReactionActions';
import urls from '@src/utils/urls';
import BaseLink from '@src/components/BaseLink';
import useRequireOwner from '@src/hooks/useRequireOwner';
import NextLink from '@src/components/NextLink';
import BaseMenuTrigger from '@src/components/BaseMenu/components/BaseMenuTrigger';
import BaseMenuList from '@src/components/BaseMenu/components/BaseMenuList';
import styled from '@src/utils/styled';
import { Bold, BreakWord, FlexRow } from '@src/components/Utils';
import { NamedMuiComponent } from '@material-ui/core/utils/isMuiElement';
import BaseLinklify from '@src/components/BaseLinklify';

export const CommentListItemFragments = {
  comment: gql`
    fragment CommentListItem_comment on Comment {
      id
      text
      createdAt
      commenter {
        id
        displayName
        thumbnailUrl
      }
      ...CommentListItemReactionActions_comment
    }
    ${CommentListItemReactionActionsFragments.comment}
  `,
};

const REMOVE_POST_COMMENT = gql`
  mutation RemovePostComment($id: ID!) {
    removePostComment(id: $id)
  }
`;

const CommenterName = styled(BaseLink)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`;

const StyledListItem = (styled(ListItem)`
  & + .MuiListItemSecondaryAction-root {
    &:hover {
      opacity: 1;
    }
  }
  &:hover {
    /* Adjacent sibling combinator */
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator */
    & + .MuiListItemSecondaryAction-root {
      opacity: 1;
    }
  }
` as unknown) as typeof ListItem;

const StyledSecondaryAction = styled(ListItemSecondaryAction)`
  opacity: 0;
  /* To position the button to top of the list item */
  top: ${({ theme }) => theme.spacing(2)}px;
  transform: none;
`;

// To make MUI be able to detect SecondaryAction in a ListItem.
// Without a SecondaryAction, the ListItem will have a "MuiListItem-root" class.
// Otherwide, it will have a "MuiListItem-container" class and it will affect styles.
((StyledSecondaryAction as unknown) as NamedMuiComponent).muiName = (ListItemSecondaryAction as NamedMuiComponent).muiName;

export interface CommentListItemProps {
  comment: CommentListItem_CommentFragment;
  updateAfterDelete: (
    commentId: ID,
  ) => RemovePostCommentMutationOptions['update'];
}

const CommentListItem = React.memo<CommentListItemProps>(
  function CommentListItem({ comment, updateAfterDelete }) {
    const { commenter } = comment;
    const confirm = useConfirmDialog();
    const [removePostComment, { loading }] = useRemovePostCommentMutation({
      mutation: REMOVE_POST_COMMENT,
      variables: { id: comment.id },
      update: updateAfterDelete(comment.id),
    });

    const requireOwner = useRequireOwner(commenter?.id);

    if (loading) {
      return <Loading />;
    }

    return (
      <StyledListItem
        key={comment.id}
        // To align the avatar to top of listItem
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar
            src={commenter?.thumbnailUrl || undefined}
            alt={commenter?.displayName}
            href={urls.user.href}
            hrefAs={urls.user.as(commenter?.id ?? '')}
            component={NextLink}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <FlexRow>
              <CommenterName
                href={urls.user.href}
                hrefAs={urls.user.as(commenter?.id ?? '')}
                color="textPrimary"
                variant="subtitle2"
                noWrap={true}
              >
                <Bold>{commenter?.displayName}</Bold>
              </CommenterName>
              <Typography
                variant="caption"
                component="span"
                color="textSecondary"
              >
                {dayjs(comment.createdAt).fromNow()}
              </Typography>
            </FlexRow>
          }
          secondary={
            <>
              <Typography variant="body2">
                <BreakWord>
                  <BaseLinklify>{comment.text}</BaseLinklify>
                </BreakWord>
              </Typography>
              <FlexRow marginTop={0.5}>
                <CommentListItemReactionActions comment={comment} />
              </FlexRow>
            </>
          }
          disableTypography
        />
        <StyledSecondaryAction>
          {requireOwner(
            <BaseMenu>
              <BaseMenuTrigger>
                <BaseIconButton size="small">
                  <MoreVertIcon />
                </BaseIconButton>
              </BaseMenuTrigger>
              <BaseMenuList>
                <MenuItem
                  onClick={() => {
                    confirm({
                      title: 'Delete comment?',
                      description: 'Are you sure to delete your comment?',
                      confirmText: 'Delete',
                      onConfirm: removePostComment,
                    });
                  }}
                >
                  Delete
                </MenuItem>
              </BaseMenuList>
            </BaseMenu>,
          )}
        </StyledSecondaryAction>
      </StyledListItem>
    );
  },
);

export default CommentListItem;
