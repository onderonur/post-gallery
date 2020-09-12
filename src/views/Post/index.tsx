import React, { useCallback, useMemo } from 'react';
import Post, { PostFragments } from '@src/components/Post';
import {
  useGetPostQuery,
  PostView_PostFragment,
  useAddPostCommentMutation,
  GetPostQueryVariables,
} from '@src/generated/graphql';
import { Bold } from '@src/components/Utils';
import CenterHorizontally from '@src/components/CenterHorizontally';
import produce from 'immer';
import { Divider, Box, Typography } from '@material-ui/core';
import CommentForm from './components/CommentForm';
import CommentList, {
  CommentListFragments,
  CommentListProps,
} from './components/CommentList';
import { useViewer } from '@src/contexts/ViewerContext';
import Loading from '@src/components/Loading';
import { addEdgeToConnection } from '@src/utils/addEdgeToConnection';
import { useRouter } from 'next/router';
import { ID } from '@src/types';
import PostSeo, { PostSeoFragments } from './components/PostSeo';
import { gql } from '@apollo/client';
import { to } from '@shared/to';

export const PostViewFragments = {
  post: gql`
    fragment PostView_post on Post {
      ...PostSeo_post
      ...Post_post
      comments(first: 10, after: $commentsAfter) @connection(key: "comments") {
        edges {
          ...CommentList_commentEdge
        }
        pageInfo {
          endCursor
          ...CommentList_pageInfo
        }
      }
    }
    ${PostSeoFragments.post}
    ${PostFragments.post}
    ${CommentListFragments.commentEdge}
    ${CommentListFragments.pageInfo}
  `,
};

const GET_POST = gql`
  query GetPost($id: ID!, $commentsAfter: Cursor) {
    post(id: $id) {
      ...PostView_post
    }
  }
  ${PostViewFragments.post}
`;

const ADD_POST_COMMENT = gql`
  mutation AddPostComment($postId: ID!, $text: String!) {
    addPostComment(input: { postId: $postId, text: $text }) {
      ...CommentList_commentEdge
    }
  }
  ${CommentListFragments.commentEdge}
`;

function PostView() {
  const router = useRouter();
  const { postId } = router.query;
  const viewer = useViewer();
  const queryVariables: GetPostQueryVariables = useMemo(
    () => ({
      id: postId as ID,
    }),
    [postId],
  );
  const {
    data,
    fetchMore,
    loading,
    error: getPostQueryError,
  } = useGetPostQuery({
    query: GET_POST,
    variables: queryVariables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });
  const [addPostComment] = useAddPostCommentMutation({
    mutation: ADD_POST_COMMENT,
    update: (cache, { data }) => {
      if (!viewer) {
        return;
      }
      const addPostComment = data?.addPostComment;
      if (!addPostComment || !post) {
        return;
      }
      const cacheKey = cache.identify(post);
      if (!cacheKey) {
        return;
      }
      const fragmentOptions = {
        id: cacheKey,
        fragment: PostViewFragments.post,
        // We need to specify the targeted fragmentName here.
        // Because, "PostViewFragments.post" includes more than one fragments.
        fragmentName: 'PostView_post',
      };
      const prevData = cache.readFragment<PostView_PostFragment>(
        fragmentOptions,
      );
      if (!prevData) {
        return;
      }
      const newData = produce(prevData, (draft) => {
        const newCommentEdge = addPostComment;
        draft.comments = addEdgeToConnection(draft.comments, newCommentEdge);
        draft.commentsCount++;
      });
      cache.writeFragment({
        ...fragmentOptions,
        data: newData,
      });
    },
  });

  const post = data?.post;

  const handleFetchMoreComments = useCallback(() => {
    const endCursor = post?.comments.pageInfo.endCursor;
    fetchMore({
      variables: {
        ...queryVariables,
        commentsAfter: endCursor,
      },
    });
  }, [post, fetchMore, queryVariables]);

  const handleUpdateAfterDelete = useCallback<
    CommentListProps['updateAfterDelete']
  >(
    (commentIdToRemove) => (cache, { data }) => {
      const success = data?.removePostComment;
      if (!success || !post) {
        return;
      }
      const fragmentOptions = {
        id: cache.identify(post),
        fragment: PostViewFragments.post,
        fragmentName: 'PostView_post',
      };
      const prevData = cache.readFragment<PostView_PostFragment>(
        fragmentOptions,
      );
      if (!prevData) {
        return;
      }
      // TODO: There may be a better way to remove the deleted
      // comment from cache completely.
      const newData = produce(prevData, (draft) => {
        draft.commentsCount--;
        draft.comments.edges = draft.comments.edges.filter(
          (edge) => edge.node.id !== commentIdToRemove,
        );
      });
      cache.writeFragment({
        ...fragmentOptions,
        data: newData,
      });
    },
    [post],
  );

  if (!post) {
    if (loading) {
      return <Loading />;
    }
    return null;
  }

  const { comments } = post;
  const standardImage = post.media?.standardImage;

  return (
    <>
      <PostSeo post={post} />
      <CenterHorizontally maxWidth={standardImage?.width}>
        <Post post={post} showOptions />
        <Divider />
        <Box marginY={1}>
          <Typography variant="subtitle1" component="h2">
            <Bold>Comments</Bold>
          </Typography>
          <CommentForm
            onSubmit={async (values, formikHelpers) => {
              const { text } = values;
              const { error } = await to(
                addPostComment({
                  variables: {
                    postId: post.id,
                    text,
                  },
                }),
              );
              if (error) {
                return;
              }
              formikHelpers.setSubmitting(false);
              formikHelpers.resetForm();
              formikHelpers.validateForm();
            }}
          />
          <CommentList
            edges={comments.edges}
            pageInfo={comments.pageInfo}
            loading={loading}
            error={getPostQueryError}
            onFetchMore={handleFetchMoreComments}
            updateAfterDelete={handleUpdateAfterDelete}
          />
        </Box>
      </CenterHorizontally>
    </>
  );
}

export default PostView;
