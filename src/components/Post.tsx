import React from 'react';
import BaseImage from '@src/components/BaseImage';
import PostReactionActions, {
  PostReactionActionsFragments,
} from './PostReactionActions';
import {
  Post_PostFragment,
  useDeletePostMutation,
} from '@src/generated/graphql';
import { Bold, BreakWord, FlexCol, FlexRow } from './Utils';
import { gql } from '@apollo/client';
import { Avatar, Box, Divider, MenuItem, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import BaseLink from './BaseLink';
import BaseMenu from './BaseMenu';
import BaseIconButton from './BaseIconButton';
import { useConfirmDialog } from '../contexts/ConfirmDialogContext';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import urls from '@src/utils/urls';
import useRequireOwner from '@src/hooks/useRequireOwner';
import { useRouter } from 'next/router';
import NextLink from './NextLink';
import BaseMenuTrigger from './BaseMenu/components/BaseMenuTrigger';
import BaseMenuList from './BaseMenu/components/BaseMenuList';
import styled from '@src/utils/styled';
import ShareButtons from './ShareButtons';
import Stack from './Stack';

const StyledLink = styled(BaseLink)`
  display: block;
`;

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
          url
        }
      }
      commentsCount
    }
    ${PostReactionActionsFragments.post}
  `,
};

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(id: $postId)
  }
`;

interface PostProps {
  post: Post_PostFragment;
  asLink?: boolean;
  showOptions?: boolean;
}

const Post: React.FC<PostProps> = ({ post, asLink, showOptions }) => {
  const confirm = useConfirmDialog();
  const router = useRouter();
  const [deletePost] = useDeletePostMutation({
    mutation: DELETE_POST,
    variables: { postId: post.id },
    onCompleted: () => {
      router.push(urls.home.href);
    },
  });

  const requireOwner = useRequireOwner(post.author?.id);

  const { media } = post;
  const standardImage = media?.standardImage;

  const postContent = (
    <>
      <FlexRow alignItems="flex-start">
        <Typography variant="h6" component="h1" color="textPrimary">
          <BreakWord>{post.title}</BreakWord>
        </Typography>
        <Box flex={1} />
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
                      title: 'Delete post?',
                      description: 'Are you sure to delete your post?',
                      confirmText: 'Delete',
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
            src={standardImage.url}
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
          href={urls.user.href}
          hrefAs={urls.user.as(author?.id ?? '')}
          component={NextLink}
        />
        <Box marginLeft={1} overflow="hidden">
          <StyledLink
            variant="subtitle2"
            href={urls.user.href}
            hrefAs={urls.user.as(author?.id ?? '')}
            color="textPrimary"
            noWrap
          >
            <Bold>{author?.displayName}</Bold>
          </StyledLink>
          <Typography variant="caption" color="textSecondary">
            {dayjs(post.createdAt).fromNow()}
          </Typography>
        </Box>
      </FlexRow>
      {asLink ? (
        <StyledLink
          href={urls.post.href}
          hrefAs={urls.post.as(post.id)}
          color="textPrimary"
        >
          <Bold>{postContent}</Bold>
        </StyledLink>
      ) : (
        postContent
      )}
      <FlexRow marginY={1} justifyContent="space-between">
        <Stack flexDirection="row" spacing={1}>
          <PostReactionActions post={post} />
          <Divider orientation="vertical" flexItem />
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >{`${post.commentsCount} Comments`}</Typography>
        </Stack>
        <ShareButtons
          url={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`}
        />
      </FlexRow>
    </div>
  );
};

export default Post;
