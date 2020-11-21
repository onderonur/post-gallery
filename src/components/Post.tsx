import React from 'react';
import PostReactionActions, {
  PostReactionActionsFragments,
} from './PostReactionActions';
import {
  Post_PostFragment,
  useDeletePostMutation,
} from '@src/generated/graphql';
import { Bold, BreakWord, FlexCol, FlexRow } from './Utils';
import { gql } from '@apollo/client';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  MenuItem,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
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
import styled from '@emotion/styled';
import ShareButtons from './ShareButtons';
import Stack from './Stack';
import Image from 'next/image';

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
          <Image
            src={standardImage.url}
            alt={post.title}
            height={standardImage.height}
            width={standardImage.width}
            layout="responsive"
          />
        </FlexCol>
      ) : null}
    </>
  );

  const { author } = post;

  const isXsDown = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down('xs'),
  );

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
      <Box marginY={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Stack
              flexDirection="row"
              spacing={1}
              justifyContent={isXsDown ? 'center' : 'flex-start'}
            >
              <PostReactionActions post={post} />
              <Divider orientation="vertical" flexItem />
              <Typography
                color="textSecondary"
                variant="subtitle2"
              >{`${post.commentsCount} Comments`}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FlexRow justifyContent={isXsDown ? 'center' : 'flex-end'}>
              <ShareButtons
                url={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`}
              />
            </FlexRow>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Post;
