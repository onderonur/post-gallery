import React, { useCallback } from "react";
import { Container, makeStyles } from "@material-ui/core";
import PostList, { PostListFragments } from "../../components/PostList";
import gql from "graphql-tag";
import { useGetPostsQuery } from "@/generated/graphql";
import produce from "immer";
import { updateConnectionAfterFetchMore } from "@/utils";
import { Cursor } from "@/types";
import { NextSeo } from "next-seo";

const GET_POSTS = gql`
  query GetPosts($after: Cursor) {
    posts(first: 10, after: $after) @connection(key: "posts") {
      ...PostList_postConnection
    }
  }
  ${PostListFragments.postConnection}
`;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 640,
  },
}));

const PostsView = React.memo(() => {
  const classes = useStyles();
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
          const newResult = produce(prevResult, (draft) => {
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
    <>
      <NextSeo title="Post Gallery" titleTemplate="%s" />
      <Container className={classes.root}>
        <PostList
          loading={loading}
          postConnection={data?.posts}
          onFetchMore={handleFetchMorePosts}
        />
      </Container>
    </>
  );
});

export default PostsView;
