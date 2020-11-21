import {
  Box,
  Divider,
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Toolbar,
} from '@material-ui/core';
import React from 'react';
import { useGetCategoriesQuery } from '@src/generated/graphql';
import Loading from '@src/components/Loading';
import styled from '@emotion/styled';
import useIsMobile from '@src/hooks/useIsMobile';
import { useAppDrawer } from '../contexts/AppLayoutContext';
import AppTitle from './AppTitle';
import { GET_CATEGORIES } from '@src/gql/queries';
import NextLink from '@src/components/NextLink';
import urls from '@src/utils/urls';
import useCategorySlug from '@src/hooks/useCategorySlug';

const drawerWidth = 220;

const StyledDrawer = styled(Drawer)<DrawerProps>`
  width: ${drawerWidth}px;
  /* To make the content pushed by the drawer */
  flex-shrink: 0;
  .MuiPaper-root {
    background: ${({ variant }) =>
      variant === 'permanent' ? 'transparent' : 'auto'};
  }
  .MuiDrawer-paperAnchorLeft {
    /* To place the drawer right next to the main content container,
    when the screen is big enough. */
    left: auto;
  }
  .MuiDrawer-paperAnchorDockedLeft {
    border: none;
  }
  .MuiDrawer-paper {
    width: ${drawerWidth}px;
  }
`;

const AppDrawer = React.memo(function AppDrawer() {
  const { data, loading } = useGetCategoriesQuery({ query: GET_CATEGORIES });
  const { isDrawerOpen, closeDrawer } = useAppDrawer();
  const isMobile = useIsMobile();
  const categorySlug = useCategorySlug(data);
  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isDrawerOpen}
      onClose={closeDrawer}
    >
      <Toolbar>
        <AppTitle />
      </Toolbar>
      {isMobile && <Divider />}
      {loading ? (
        <Loading />
      ) : (
        <Box overflow="auto">
          <List subheader={<li />}>
            <ListSubheader>CATEGORIES</ListSubheader>
            {data?.categories.map((category) => {
              const href = urls.categoryPosts.href;
              const hrefAs = urls.categoryPosts.as(category.slug);
              return (
                <ListItem
                  key={category.id}
                  button
                  component={NextLink}
                  href={href}
                  hrefAs={hrefAs}
                  selected={Boolean(
                    categorySlug && category.slug === categorySlug,
                  )}
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </Box>
      )}
    </StyledDrawer>
  );
});

export default AppDrawer;
