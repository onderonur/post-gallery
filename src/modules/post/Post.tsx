import React from 'react';
import PostReactionActions, {
  PostReactionActionsFragments,
} from './PostReactionActions';
import {
  Post_PostFragment,
  useDeletePostMutation,
} from '@src/generated/graphql';
import { Bold, BreakWord } from '@src/modules/styling/StylingUtils';
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
import BaseLink from '@src/modules/routing/BaseLink';
import BaseMenu from '@src/modules/base-menu/BaseMenu';
import BaseIconButton from '@src/modules/shared/BaseIconButton';
import { useConfirmDialog } from '../confirm-dialog/ConfirmDialog';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { urls } from '@src/modules/routing/RoutingUtils';
import { useRequireOwner } from '@src/modules/auth/AuthHooks';
import { useRouter } from 'next/router';
import NextLink from '@src/modules/routing/NextLink';
import BaseMenuTrigger from '@src/modules/base-menu/BaseMenuTrigger';
import BaseMenuList from '@src/modules/base-menu/BaseMenuList';
import styled from '@emotion/styled';
import ShareButtons from '../social-buttons/ShareButtons';
import Stack from '@src/modules/shared/Stack';
import Image from 'next/image';
import FlexCol from '@src/modules/shared/FlexCol';
import FlexRow from '@src/modules/shared/FlexRow';

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
      router.push(urls.home());
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
          href={urls.userProfile(author?.id ?? '')}
          component={NextLink}
        />
        <Box marginLeft={1} overflow="hidden">
          <StyledLink
            variant="subtitle2"
            href={urls.userProfile(author?.id ?? '')}
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
        <StyledLink href={urls.post(post.id)} color="textPrimary">
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
