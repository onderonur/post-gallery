import React, { useCallback } from 'react';
import UserLayout, { UserLayoutFragments } from '../../components/UserLayout';
import { Container } from '@material-ui/core';
import PostList, { PostListFragments } from '@src/components/PostList';
import Loading from '@src/components/Loading';
import { useRouter } from 'next/router';
import { ID, Cursor } from '@src/types';
import { useGetUserWithPostsQuery } from '@src/generated/graphql';
import { gql } from '@apollo/client';

const GET_USER_WITH_POSTS = gql`
  query GetUserWithPosts($id: ID!, $after: Cursor) {
    user(id: $id) {
      ...UserLayout_user
      posts(first: 10, after: $after) @connection(key: "userPosts") {
        ...PostList_postConnection
      }
    }
  }
  ${UserLayoutFragments.user}
  ${PostListFragments.postConnection}
`;

function UserPostsView() {
  const router = useRouter();
  const { userId } = router.query;
  const { data, loading, error, fetchMore } = useGetUserWithPostsQuery({
    query: GET_USER_WITH_POSTS,
    variables: { id: userId as ID },
    fetchPolicy: 'cache-and-network',
    returnPartialData: true,
  });

  const handleFetchMorePosts = useCallback(
    (after: Cursor) => {
      fetchMore({
        variables: { after },
      });
    },
    [fetchMore],
  );

  const user = data?.user;

  return (
    <UserLayout user={user}>
      {!user && loading ? (
        <Loading />
      ) : (
        <Container maxWidth="sm">
          <PostList
            loading={loading}
            error={error}
            postConnection={user?.posts}
            onFetchMore={handleFetchMorePosts}
          />
        </Container>
      )}
    </UserLayout>
  );
}

export default UserPostsView;
