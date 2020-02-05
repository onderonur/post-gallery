import React from "react";
import { FlexCol } from "components/FlexCol";
import PostListItem from "./PostListItem";

const PostList = ({ postConnection }: any) => {
  const edges = postConnection?.edges || [];

  return (
    <FlexCol>
      {edges.map((edge: any) => {
        return <PostListItem postEdge={edge} />;
      })}
    </FlexCol>
  );
};

export default PostList;
