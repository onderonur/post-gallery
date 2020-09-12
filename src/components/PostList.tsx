import React from 'react';
import { gql } from '@apollo/client';
import { PostList_PostConnectionFragment, Maybe } from '@src/generated/graphql';
import Post, { PostFragments } from '@src/components/Post';
import Loading from '@src/components/Loading';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { RootRef, Divider } from '@material-ui/core';
import { Cursor } from '@src/types';
import Stack from './Stack';
import AlertInfo from './AlertInfo';

export const PostListFragments = {
  postConnection: gql`
    fragment PostList_postConnection on PostConnection {
      edges {
        cursor
        node {
          ...Post_post
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    ${PostFragments.post}
  `,
};

export interface PostListProps {
  postConnection: Maybe<PostList_PostConnectionFragment>;
  loading: boolean;
  error: Maybe<Error>;
  onFetchMore: (after: Cursor) => void;
}

const PostList: React.FC<PostListProps> = ({
  postConnection,
  loading,
  error,
  onFetchMore,
}) => {
  const pageInfo = postConnection?.pageInfo;
  const infiniteRef = useInfiniteScroll({
    hasNextPage: Boolean(!error && pageInfo?.hasNextPage),
    loading,
    onLoadMore: () => onFetchMore(pageInfo?.endCursor),
  });

  if (!postConnection && loading) {
    return <Loading />;
  }

  const edges = postConnection?.edges;

  if (!edges?.length && !pageInfo?.hasNextPage) {
    return <AlertInfo message="There are no posts to display." />;
  }

  return (
    <RootRef rootRef={infiniteRef}>
      <Stack spacing={1} flexDirection="column">
        {edges?.map((edge, i) => {
          return (
            <div key={edge.cursor}>
              <Post post={edge.node} asLink />
              {i !== edges.length - 1 && <Divider />}
            </div>
          );
        })}
        {postConnection?.pageInfo.hasNextPage && <Loading />}
      </Stack>
    </RootRef>
  );
};

export default PostList;
