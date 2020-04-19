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
  makeStyles,
} from "@material-ui/core";
import gql from "graphql-tag";
import {
  CommentListItem_CommentFragment,
  useRemovePostCommentMutation,
  RemovePostCommentMutationOptions,
} from "@/generated/graphql";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BaseMenu, { BaseMenuList, BaseMenuTrigger } from "@/components/BaseMenu";
import BaseIconButton from "@/components/BaseIconButton";
import { useConfirmDialog } from "@/components/ConfirmDialog";
import Loading from "@/components/Loading";
import { ID } from "@/types";
import BaseButton from "@/components/BaseButton";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import FlexRow from "@/components/FlexRow";
import CommentListItemReactionActions, {
  CommentListItemReactionActionsFragments,
} from "./CommentListItemReactionActions";
import { truncate } from "@/styles";
import URLS from "@/constants/urls";
import BaseLink from "@/components/BaseLink";
import useRequireOwner from "@/hooks/useRequireOwner";
import NextLink from "@/components/NextLink";

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

const useStyles = makeStyles((theme) => ({
  commenterName: {
    ...truncate,
    marginRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
  commentText: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  container: {
    "&:hover": {
      "& $secondaryAction": {
        opacity: 1,
      },
    },
  },
  secondaryAction: {
    opacity: 0,
  },
}));

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
  const classes = useStyles();
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
    <ListItem
      classes={{
        container: classes.container,
      }}
      key={comment.id}
      // To align the avatar to top of listItem
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar
          src={commenter?.thumbnailUrl || undefined}
          alt={commenter?.displayName}
          href={URLS.user}
          hrefAs={`/users/${commenter?.id}`}
          component={NextLink}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <FlexRow>
            <BaseLink
              className={classes.commenterName}
              href={URLS.user}
              hrefAs={`/users/${commenter?.id}`}
              color="textPrimary"
              variant="subtitle2"
            >
              {commenter?.displayName}
            </BaseLink>
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
            <div className={classes.commentText}>{comment.text}</div>
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
      <ListItemSecondaryAction className={classes.secondaryAction}>
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
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CommentListItem;
