import React from "react";
import dayjs from "dayjs";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  ListItemAvatar,
  Avatar,
  MenuItem,
} from "@material-ui/core";
import gql from "graphql-tag";
import {
  CommentListItem_CommentFragment,
  useRemovePostCommentMutation,
  RemovePostCommentMutationOptions,
} from "generated/graphql";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BaseMenu, { BaseMenuList, BaseMenuTrigger } from "components/BaseMenu";
import BaseIconButton from "components/BaseIconButton";
import { useConfirmDialog } from "components/ConfirmDialog";
import Loading from "components/Loading";
import { ID } from "types";
import BaseButton from "components/BaseButton";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import FlexRow from "components/FlexRow";
import CommentListItemReactionActions, {
  CommentListItemReactionActionsFragments,
} from "./CommentListItemReactionActions";
import { truncate } from "styles";
import URLS, { setUrlParams } from "constants/urls";
import BaseLink from "components/BaseLink";
import ReactRouterLink from "components/ReactRouterLink";
import useRequireOwner from "hooks/useRequireOwner";

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
${truncate}
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

const CommentText = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
`;

const HiddenSecondaryAction = styled(ListItemSecondaryAction)`
  opacity: 0;
  /* https://material-ui.com/api/list-item/#css */
  .MuiListItem-container:hover & {
    opacity: 1;
  }
`;

export interface CommentListItemProps {
  comment: CommentListItem_CommentFragment;
  updateAfterDelete: (
    commentId: ID,
  ) => RemovePostCommentMutationOptions["update"];
}

const CommentListItem: React.FC<CommentListItemProps> = ({
  comment,
  updateAfterDelete,
}) => {
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

  const commenterProfilePath = setUrlParams(URLS.user, {
    userId: commenter?.id || "",
  });

  return (
    <ListItem
      key={comment.id}
      // To align the avatar to top of listItem
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar
          src={commenter?.thumbnailUrl || undefined}
          alt={commenter?.displayName || undefined}
          to={commenterProfilePath}
          component={ReactRouterLink}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <FlexRow>
            <CommenterName
              to={commenterProfilePath}
              color="textPrimary"
              variant="subtitle2"
            >
              {commenter?.displayName}
            </CommenterName>
            <Typography
              component="span"
              variant="caption"
              color="textSecondary"
            >
              {dayjs(comment.createdAt).fromNow()}
            </Typography>
          </FlexRow>
        }
        secondary={
          <>
            <CommentText>{comment.text}</CommentText>
            <FlexRow marginTop={0.5}>
              <CommentListItemReactionActions comment={comment} />
              <BaseButton
                startIcon={<CommentOutlinedIcon />}
                variant="text"
                size="small"
              />
            </FlexRow>
          </>
        }
        disableTypography
      />
      <HiddenSecondaryAction>
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
                    title: "Delete comment?",
                    description: "Are you sure to delete your comment?",
                    confirmText: "Delete",
                    onConfirm: removePostComment,
                  });
                }}
              >
                Delete
              </MenuItem>
            </BaseMenuList>
          </BaseMenu>,
        )}
      </HiddenSecondaryAction>
    </ListItem>
  );
};

export default CommentListItem;
