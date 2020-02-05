import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Container } from "@material-ui/core";
import styled from "styled-components";
import PostList from "./components/PostList";

const Root = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  max-width: 640px;
`;

const GET_POSTS = gql`
  query GetPosts {
    posts {
      totalCount
      edges {
        node {
          id
          title
          postMedias {
            id
            media {
              id
              standardWidth
              standardHeight
              standardURL
            }
          }
        }
      }
    }
  }
`;

const Posts = () => {
  const { data, loading } = useQuery(GET_POSTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Root>
      <PostList postConnection={data?.posts} />
    </Root>
  );
};

export default Posts;
