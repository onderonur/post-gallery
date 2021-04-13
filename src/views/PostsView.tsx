import React, { useCallback, useMemo } from 'react';
import { Box, Container, Divider, Typography } from '@material-ui/core';
import PostList, { PostListFragments } from '../modules/post/PostList';
import { gql } from '@apollo/client';
import {
  GetCategoryWithPostsQueryVariables,
  useGetCategoriesQuery,
  useGetCategoryWithPostsQuery,
} from '@src/generated/graphql';
import { Cursor } from '@src/types';
import { NextSeo } from 'next-seo';
import styled from '@emotion/styled';
import { GET_CATEGORIES } from '@src/modules/categories/CategoryQueries';
import { Bold } from '@src/modules/styling/StylingUtils';
import { useCategorySlug } from '@src/modules/categories/CategoryHooks';

const GET_CATEGORY_WITH_POSTS = gql`
  query GetCategoryWithPosts($slug: String!, $after: Cursor) {
    category(slug: $slug) {
      id
      name
      posts(first: 10, after: $after) {
        ...PostList_postConnection
      }
    }
  }
  ${PostListFragments.postConnection}
`;

const Root = styled(Container)`
  max-width: 640px;
`;

function PostsView() {
  const {
    data: categoriesData,
    loading: isLoadingCategories,
  } = useGetCategoriesQuery({
    query: GET_CATEGORIES,
  });
  const categorySlug = useCategorySlug(categoriesData);
  const variables = useMemo<GetCategoryWithPostsQueryVariables | undefined>(
    () =>
      categorySlug
        ? {
            slug: categorySlug,
          }
        : undefined,
    [categorySlug],
  );
  const { data, loading, error, fetchMore } = useGetCategoryWithPostsQuery({
    query: GET_CATEGORY_WITH_POSTS,
    variables,
    skip: !variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const handleFetchMorePosts = useCallback(
    (after: Cursor) => {
      fetchMore({
        variables: { ...variables, after },
      });
    },
    [fetchMore, variables],
  );

  const category = data?.category;

  return (
    <>
      <Root>
        {category && (
          <>
            <NextSeo title={category.name} />
            <Typography variant="h5" component="h2">
              <Bold>{category.name}</Bold>
            </Typography>
            <Box marginY={1}>
              <Divider />
            </Box>
          </>
        )}
        <PostList
          loading={loading || isLoadingCategories}
          error={error}
          postConnection={category?.posts}
          onFetchMore={handleFetchMorePosts}
        />
      </Root>
    </>
  );
}

export default PostsView;
