import React from "react";
import { FlexCol } from "components/FlexCol";
import gql from "graphql-tag";
import { PostList_PostConnectionFragment, Maybe } from "generated/graphql";
import Post, { PostFragments } from "components/Post";
import styled from "styled-components";
import Loading from "components/Loading";
import { useInfiniteScroll } from "react-infinite-scroll-hook";
import { RootRef } from "@material-ui/core";
import { Cursor } from "types";

const PostListContainer = styled(FlexCol)`
  > *:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.palette.divider};
    padding-top: ${({ theme }) => theme.spacing(1)}px;
  }
`;

export const PostListFragments = {
  postConnection: gql`
    fragment PostList_postConnection on PostConnection {
      edges {
        cursor
        node {
          ...Post_post
          comments(first: 0) @connection(key: "comments") {
            ...Post_comments
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    ${PostFragments.post}
    ${PostFragments.comments}
  `,
};

interface PostListProps {
  loading: boolean;
  postConnection: Maybe<PostList_PostConnectionFragment>;
  onFetchMore: (after: Cursor) => void;
}

const PostList: React.FC<PostListProps> = ({
  postConnection,
  loading,
  onFetchMore,
}) => {
  const infiniteRef = useInfiniteScroll({
    hasNextPage: Boolean(postConnection?.pageInfo.hasNextPage),
    loading,
    onLoadMore: () => onFetchMore(postConnection?.pageInfo.endCursor),
  });

  if (!postConnection && loading) {
    return <Loading />;
  }

  return (
    <RootRef rootRef={infiniteRef}>
      <PostListContainer>
        {postConnection?.edges.map(edge => {
          return (
            <Post
              key={edge.cursor}
              post={edge.node}
              comments={edge.node.comments}
              asLink
            />
          );
        })}
        {postConnection?.pageInfo.hasNextPage && <Loading />}
      </PostListContainer>
    </RootRef>
  );
};

export default PostList;
