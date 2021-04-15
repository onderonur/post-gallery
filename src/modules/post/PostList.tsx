import React, { useCallback } from 'react';
import { gql } from '@apollo/client';
import { PostList_PostConnectionFragment, Maybe } from '@src/generated/graphql';
import Post, { PostFragments } from '@src/modules/post/Post';
import Loading from '@src/modules/shared/Loading';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Divider } from '@material-ui/core';
import { Cursor } from '@src/modules/shared/SharedTypes';
import Stack from '@src/modules/shared/Stack';
import AlertInfo from '@src/modules/shared/AlertInfo';
import AlertError from '@src/modules/shared/AlertError';

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
  const handleLoadMore = useCallback(() => {
    onFetchMore(pageInfo?.endCursor);
  }, [onFetchMore, pageInfo?.endCursor]);
  const [sentryRef] = useInfiniteScroll({
    hasNextPage: Boolean(pageInfo?.hasNextPage),
    loading,
    disabled: !!error,
    onLoadMore: handleLoadMore,
    rootMargin: '0px 0px 400px 0px',
  });

  if (!postConnection && loading) {
    return <Loading />;
  }

  const edges = postConnection?.edges;

  if (error) {
    return <AlertError error={error} />;
  }

  if (!edges?.length && !pageInfo?.hasNextPage) {
    return <AlertInfo message="There are no posts to display." />;
  }

  return (
    <Stack spacing={1} flexDirection="column">
      {edges?.map((edge, i) => {
        return (
          <div key={edge.cursor}>
            <Post post={edge.node} asLink />
            {i !== edges.length - 1 && <Divider />}
          </div>
        );
      })}
      {postConnection?.pageInfo.hasNextPage && <Loading ref={sentryRef} />}
    </Stack>
  );
};

export default PostList;
