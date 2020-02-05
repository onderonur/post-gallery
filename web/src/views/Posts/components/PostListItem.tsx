import React from "react";
import styled from "styled-components";
import BaseImage from "components/BaseImage";
import BoldTypography from "components/BoldTypography";

const PostListItemContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`;

const PostListItem = ({ postEdge }: any) => {
  const node = postEdge.node;
  const { media } = node.postMedias[0];
  const { standardWidth, standardHeight, standardURL } = media;
  return (
    <PostListItemContainer key={node.id}>
      <BoldTypography variant="h5" component="h2">
        {node.title}
      </BoldTypography>
      <BaseImage
        aspectRatio={`${standardWidth}:${standardHeight}`}
        src={`http://localhost:4000${standardURL}`}
        alt={node.title}
      />
    </PostListItemContainer>
  );
};

export default PostListItem;
