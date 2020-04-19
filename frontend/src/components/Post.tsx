import React from "react";
import BaseImage from "@/components/BaseImage";
import PostReactionActions, {
  PostReactionActionsFragments,
} from "./PostReactionActions";
import {
  Post_PostFragment,
  Post_CommentsFragment,
  useDeletePostMutation,
} from "@/generated/graphql";
import { BoldText, SecondaryText } from "./Text";
import { FlexCol } from "./FlexCol";
import FlexRow from "./FlexRow";
import gql from "graphql-tag";
import { Avatar, Box, MenuItem, makeStyles } from "@material-ui/core";
import dayjs from "dayjs";
import BaseLink from "./BaseLink";
import BaseMenu, { BaseMenuList, BaseMenuTrigger } from "./BaseMenu";
import BaseIconButton from "./BaseIconButton";
import { useConfirmDialog } from "./ConfirmDialog";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import URLS from "@/constants/urls";
import useRequireOwner from "@/hooks/useRequireOwner";
import { useRouter } from "next/router";
import NextLink from "./NextLink";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "block",
    fontWeight: theme.typography.fontWeightBold,
    "&:hover": {
      textDecoration: "none",
    },
  },
  postTitle: {
    wordBreak: "break-word",
    color: theme.palette.text.primary,
    flex: 1,
  },
}));

export const PostFragments = {
  post: gql`
    fragment Post_post on Post {
      ...PostReactionActions_post
      title
      createdAt
      author {
        id
        displayName
        thumbnailUrl
      }
      media {
        id
        standardImage {
          width
          height
          Url
        }
      }
    }
    ${PostReactionActionsFragments.post}
  `,
  comments: gql`
    fragment Post_comments on CommentConnection {
      totalCount
    }
  `,
};

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(id: $postId)
  }
`;

interface PostProps {
  post: Post_PostFragment;
  comments: Post_CommentsFragment;
  asLink?: boolean;
  showOptions?: boolean;
}

const Post: React.FC<PostProps> = ({ post, comments, asLink, showOptions }) => {
  const classes = useStyles();
  const confirm = useConfirmDialog();

  const router = useRouter();
  const [deletePost] = useDeletePostMutation({
    mutation: DELETE_POST,
    variables: { postId: post.id },
    onCompleted: () => {
      router.push(URLS.posts);
    },
  });

  const requireOwner = useRequireOwner(post.author?.id);

  const { media } = post;
  const standardImage = media?.standardImage;

  const postContent = (
    <>
      <FlexRow alignItems="flex-start">
        <BoldText className={classes.postTitle} variant="h6" component="h1">
          {post.title}
        </BoldText>
        {showOptions &&
          requireOwner(
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
                      title: "Delete post?",
                      description: "Are you sure to delete your post?",
                      confirmText: "Delete",
                      onConfirm: deletePost,
                    });
                  }}
                >
                  Delete
                </MenuItem>
              </BaseMenuList>
            </BaseMenu>,
          )}
      </FlexRow>
      {standardImage ? (
        <FlexCol>
          <BaseImage
            aspectRatio={`${standardImage.width}:${standardImage.height}`}
            src={`${process.env.API_URL}${standardImage.Url}`}
            alt={post.title}
          />
        </FlexCol>
      ) : null}
    </>
  );

  const { author } = post;

  return (
    <div>
      <FlexRow alignItems="flex-start" marginBottom={0.5}>
        <Avatar
          src={author?.thumbnailUrl || undefined}
          alt={author?.displayName}
          href={URLS.user}
          hrefAs={`/users/${author?.id}`}
          component={NextLink}
        />
        <Box marginLeft={1} overflow="hidden">
          <BaseLink
            className={classes.link}
            variant="subtitle2"
            href={URLS.user}
            hrefAs={`/users/${author?.id}`}
            color="textPrimary"
            noWrap
          >
            {author?.displayName}
          </BaseLink>
          <SecondaryText variant="caption">
            {dayjs(post.createdAt).fromNow()}
          </SecondaryText>
        </Box>
      </FlexRow>
      {asLink ? (
        <BaseLink
          className={classes.link}
          href={URLS.post}
          hrefAs={`/${post.id}`}
          color="textPrimary"
        >
          {postContent}
        </BaseLink>
      ) : (
        postContent
      )}
      <FlexRow marginY={1} justifyContent="space-between">
        <PostReactionActions post={post} />
        <SecondaryText variant="subtitle2">{`${comments.totalCount} Comments`}</SecondaryText>
      </FlexRow>
    </div>
  );
};

export default Post;
