import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import gql from "graphql-tag";
import Post, { PostFragments } from "components/Post";
import {
  useGetPostQuery,
  PostView_PostFragment,
  useAddPostCommentMutation,
  GetPostQueryVariables,
} from "generated/graphql";
import { BoldText } from "components/Text";
import CenterHorizontally from "components/CenterHorizontally";
import produce from "immer";
import { Divider, Box } from "@material-ui/core";
import CommentForm from "./components/CommentForm";
import CommentList, { CommentListFragments } from "./components/CommentList";
import { useViewer } from "components/ViewerProvider";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";
import Loading from "components/Loading";
import { updateConnectionAfterFetchMore, addEdgeToConnection } from "utils";

export const PostViewFragments = {
  post: gql`
    fragment PostView_post on Post {
      ...Post_post
      comments(first: 10, after: $commentsAfter) @connection(key: "comments") {
        ...Post_comments
        edges {
          ...CommentList_commentEdge
        }
        pageInfo {
          endCursor
          ...CommentList_pageInfo
        }
      }
    }
    ${PostFragments.post}
    ${PostFragments.comments}
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

interface RouteParams {
  postId: string;
}

const PostView = () => {
  const { postId } = useParams<RouteParams>();
  const viewer = useViewer();
  const queryVariables: GetPostQueryVariables = useMemo(
    () => ({
      id: postId,
    }),
    [postId],
  );
  const { data, fetchMore, loading } = useGetPostQuery({
    query: GET_POST,
    variables: queryVariables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });
  const [addPostComment] = useAddPostCommentMutation({
    mutation: ADD_POST_COMMENT,
    update: (cache, { data }) => {
      if (!viewer) {
        return;
      }
      const addPostComment = data?.addPostComment;
      if (!addPostComment) {
        return;
      }
      const cacheKey = defaultDataIdFromObject(post);
      if (!cacheKey) {
        return;
      }
      const fragmentOptions = {
        id: cacheKey,
        fragment: PostViewFragments.post,
        // We need to specify the targeted fragmentName here.
        // Because, "PostViewFragments.post" includes more than one fragments.
        fragmentName: "PostView_post",
      };
      const prevData = cache.readFragment<PostView_PostFragment>(
        fragmentOptions,
      );
      if (!prevData) {
        return;
      }
      const newData = produce(prevData, draft => {
        const newCommentEdge = addPostComment;
        draft.comments = addEdgeToConnection(draft.comments, newCommentEdge);
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
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const prevPost = prevResult.post;
        if (!prevPost) {
          return prevResult;
        }
        const resultPost = produce(prevPost, draft => {
          draft.comments = updateConnectionAfterFetchMore(
            prevPost.comments,
            fetchMoreResult?.post?.comments,
          );
        });
        const result = produce(prevResult, draft => {
          draft.post = resultPost;
        });
        return result;
      },
    });
  }, [post, fetchMore, queryVariables]);

  if (!post) {
    if (loading) {
      return <Loading />;
    }
    // TODO: Redirect to 404
    return null;
  }

  const { comments } = post;
  const standardImage = post.media?.standardImage;

  return (
    <CenterHorizontally maxWidth={standardImage?.width}>
      <Post post={post} comments={comments} showOptions />
      <Divider />
      <Box marginY={1}>
        <BoldText variant="subtitle1" component="h2">
          Comments
        </BoldText>
        <CommentForm
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const { text } = values;
            await addPostComment({
              variables: {
                postId: post.id,
                text,
              },
            });
            setSubmitting(false);
            resetForm();
          }}
        />
        <CommentList
          edges={comments.edges}
          pageInfo={comments.pageInfo}
          loading={loading}
          onFetchMore={handleFetchMoreComments}
          updateAfterDelete={commentId => (cache, { data }) => {
            const success = data?.removePostComment;
            if (!success) {
              return;
            }

            const cacheKey = defaultDataIdFromObject(post);
            if (!cacheKey) {
              return;
            }

            const fragmentOptions = {
              id: cacheKey,
              fragment: PostViewFragments.post,
              fragmentName: "PostView_post",
            };
            const prevData = cache.readFragment<PostView_PostFragment>(
              fragmentOptions,
            );
            if (!prevData) {
              return;
            }
            const newData = produce(prevData, draft => {
              const { comments } = draft;
              const { edges } = comments;
              const removedCommentIndex = edges.findIndex(
                edge => edge.node.id === commentId,
              );
              // TODO: Will use "cache.evict" in future
              comments.edges.splice(removedCommentIndex, 1);
              draft.comments.totalCount--;
            });
            cache.writeFragment({
              ...fragmentOptions,
              data: newData,
            });
          }}
        />
      </Box>
    </CenterHorizontally>
  );
};

export default PostView;
