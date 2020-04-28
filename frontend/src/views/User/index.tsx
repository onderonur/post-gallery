import React, { useCallback } from "react";
import UserLayout, { UserLayoutFragments } from "./components/UserLayout";
import { Container } from "@material-ui/core";
import PostList, { PostListFragments } from "@/components/PostList";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { ID, Cursor } from "@/types";
import { useGetUserWithPostsQuery } from "@/generated/graphql";
import produce from "immer";
import { updateConnectionAfterFetchMore } from "@/utils";
import gql from "graphql-tag";

const GET_USER_WITH_POSTS = gql`
  query GetUserWithPosts($id: ID!, $after: Cursor) {
    user(id: $id) {
      ...UserLayout_user
      posts(first: 10, after: $after) @connection(key: "userPosts") {
        ...UserLayout_userPosts
        ...PostList_postConnection
      }
    }
  }
  ${UserLayoutFragments.user}
  ${UserLayoutFragments.userPosts}
  ${PostListFragments.postConnection}
`;

const UserView = React.memo(() => {
  const router = useRouter();
  const { userId } = router.query;
  const { data, loading, fetchMore } = useGetUserWithPostsQuery({
    query: GET_USER_WITH_POSTS,
    variables: { id: userId as ID },
    fetchPolicy: "cache-and-network",
    returnPartialData: true,
  });

  const handleFetchMorePosts = useCallback(
    (after: Cursor) => {
      fetchMore({
        variables: { after },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newResult = produce(prevResult, (draft) => {
            if (!draft.user) {
              return prevResult;
            }
            draft.user.posts = updateConnectionAfterFetchMore(
              draft.user?.posts,
              fetchMoreResult?.user?.posts,
            );
          });
          return newResult;
        },
      });
    },
    [fetchMore],
  );

  const user = data?.user;

  return (
    <UserLayout user={user} userPosts={user?.posts}>
      {loading ? (
        <Loading />
      ) : (
        <Container maxWidth="sm">
          <PostList
            loading={loading}
            postConnection={user?.posts}
            onFetchMore={handleFetchMorePosts}
          />
        </Container>
      )}
    </UserLayout>
  );
});

export default UserView;
