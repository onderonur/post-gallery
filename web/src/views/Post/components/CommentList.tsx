import React from "react";
import { List, RootRef } from "@material-ui/core";
import gql from "graphql-tag";
import CommentListItem, {
  CommentListItemFragments,
  CommentListItemProps,
} from "./CommentListItem";
import {
  CommentList_CommentEdgeFragment,
  CommentList_PageInfoFragment,
} from "generated/graphql";
import Loading from "components/Loading";
import { useInfiniteScroll } from "react-infinite-scroll-hook";

export const CommentListFragments = {
  commentEdge: gql`
    fragment CommentList_commentEdge on CommentEdge {
      cursor
      node {
        ...CommentListItem_comment
      }
    }
    ${CommentListItemFragments.comment}
  `,
  pageInfo: gql`
    fragment CommentList_pageInfo on PageInfo {
      hasNextPage
    }
  `,
};

interface CommentListProps {
  edges: CommentList_CommentEdgeFragment[];
  pageInfo: CommentList_PageInfoFragment;
  loading: boolean;
  onFetchMore: VoidFunction;
  updateAfterDelete: CommentListItemProps["updateAfterDelete"];
}

const CommentList: React.FC<CommentListProps> = ({
  edges,
  pageInfo,
  loading,
  onFetchMore,
  updateAfterDelete,
}) => {
  const { hasNextPage } = pageInfo;
  const infiniteRef = useInfiniteScroll({
    hasNextPage,
    loading,
    onLoadMore: onFetchMore,
  });
  return (
    <RootRef rootRef={infiniteRef}>
      <List>
        {edges.map(edge => {
          return (
            <CommentListItem
              key={edge.cursor}
              comment={edge.node}
              updateAfterDelete={updateAfterDelete}
            />
          );
        })}
        {hasNextPage && <Loading />}
      </List>
    </RootRef>
  );
};

export default CommentList;
