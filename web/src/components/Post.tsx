import React from "react";
import styled from "styled-components";
import BaseImage from "components/BaseImage";
import PostReactionActions, {
  PostReactionActionsFragments,
} from "./PostReactionActions";
import {
  Post_PostFragment,
  Post_CommentsFragment,
  useDeletePostMutation,
} from "generated/graphql";
import { BoldText, SecondaryText } from "./Text";
import { FlexCol } from "./FlexCol";
import FlexRow from "./FlexRow";
import gql from "graphql-tag";
import { Avatar, Box, MenuItem } from "@material-ui/core";
import dayjs from "dayjs";
import BaseLink from "./BaseLink";
import BaseMenu, { BaseMenuList, BaseMenuTrigger } from "./BaseMenu";
import BaseIconButton from "./BaseIconButton";
import { useConfirmDialog } from "./ConfirmDialog";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import URLS, { setUrlParams } from "constants/urls";
import ReactRouterLink from "./ReactRouterLink";
import useRequireOwner from "hooks/useRequireOwner";

const StyledLink = styled(BaseLink)`
  display: block;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  &:hover {
    text-decoration: none;
  }
`;

const PostTitle = styled(BoldText)`
  word-break: break-word;
  color: ${({ theme }) => theme.palette.text.primary};
  flex: 1;
` as typeof BoldText;

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
  const confirm = useConfirmDialog();

  const history = useHistory();
  const [deletePost] = useDeletePostMutation({
    mutation: DELETE_POST,
    variables: { postId: post.id },
    onCompleted: () => {
      history.push(URLS.posts);
    },
  });

  const requireOwner = useRequireOwner(post.author?.id);

  const { media } = post;
  const standardImage = media?.standardImage;

  const postContent = (
    <>
      <FlexRow alignItems="flex-start">
        <PostTitle variant="h6" component="h1">
          {post.title}
        </PostTitle>
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
            src={`http://localhost:4000${standardImage.Url}`}
            alt={post.title}
          />
        </FlexCol>
      ) : null}
    </>
  );

  const { author } = post;

  const authorProfilePath = setUrlParams(URLS.user, {
    userId: author?.id || "",
  });

  return (
    <div>
      <FlexRow alignItems="flex-start" marginBottom={0.5}>
        <Avatar
          src={author?.thumbnailUrl || undefined}
          alt={author?.displayName}
          to={authorProfilePath}
          component={ReactRouterLink}
        />
        <Box marginLeft={1} overflow="hidden">
          <StyledLink
            variant="subtitle2"
            to={authorProfilePath}
            color="textPrimary"
            noWrap
          >
            {author?.displayName}
          </StyledLink>
          <SecondaryText variant="caption">
            {dayjs(post.createdAt).fromNow()}
          </SecondaryText>
        </Box>
      </FlexRow>
      {asLink ? (
        <StyledLink
          to={setUrlParams(URLS.post, { postId: post.id })}
          color="textPrimary"
        >
          {postContent}
        </StyledLink>
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
