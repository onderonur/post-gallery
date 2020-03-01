import React, { useCallback } from "react";
import { Container } from "@material-ui/core";
import styled from "styled-components";
import PostList, { PostListFragments } from "../../components/PostList";
import gql from "graphql-tag";
import { useGetPostsQuery } from "generated/graphql";
import produce from "immer";
import { updateConnectionAfterFetchMore } from "utils";
import { Cursor } from "types";

const PostsContainer = styled(Container)`
  max-width: 640px;
`;

const GET_POSTS = gql`
  query GetPosts($after: Cursor) {
    posts(first: 10, after: $after) @connection(key: "posts") {
      ...PostList_postConnection
    }
  }
  ${PostListFragments.postConnection}
`;

const PostsView = () => {
  const { data, loading, fetchMore } = useGetPostsQuery({
    query: GET_POSTS,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

  const handleFetchMorePosts = useCallback(
    (after: Cursor) => {
      fetchMore({
        variables: { after },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newResult = produce(prevResult, draft => {
            draft.posts = updateConnectionAfterFetchMore(
              draft.posts,
              fetchMoreResult?.posts,
            );
          });
          return newResult;
        },
      });
    },
    [fetchMore],
  );

  return (
    <PostsContainer>
      <PostList
        loading={loading}
        postConnection={data?.posts}
        onFetchMore={handleFetchMorePosts}
      />
    </PostsContainer>
  );
};

export default PostsView;
