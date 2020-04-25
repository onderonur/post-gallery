import React from "react";
import { FlexCol } from "@/components/FlexCol";
import gql from "graphql-tag";
import { PostList_PostConnectionFragment, Maybe } from "@/generated/graphql";
import Post, { PostFragments } from "@/components/Post";
import Loading from "@/components/Loading";
import { useInfiniteScroll } from "react-infinite-scroll-hook";
import { RootRef, makeStyles } from "@material-ui/core";
import { Cursor } from "@/types";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *:not(:first-child)": {
      borderTop: `1px solid ${theme.palette.divider}`,
      paddingTop: theme.spacing(1),
    },
  },
}));

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

export interface PostListProps {
  loading: boolean;
  postConnection: Maybe<PostList_PostConnectionFragment>;
  onFetchMore: (after: Cursor) => void;
}

const PostList: React.FC<PostListProps> = ({
  postConnection,
  loading,
  onFetchMore,
}) => {
  const classes = useStyles();
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
      <FlexCol className={classes.root}>
        {postConnection?.edges.map((edge) => {
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
      </FlexCol>
    </RootRef>
  );
};

export default PostList;
