import React, { useState } from 'react';
import AppHeader from './AppHeader';
import { Container, Box, Toolbar } from '@material-ui/core';
import AppLayoutProvider from './AppLayoutContext';
import AppDrawer from './AppDrawer';
import styled from '@emotion/styled';
import HideOnScroll from './HideOnScroll';

const StyledContainer = styled(Container)`
  display: flex;
  padding: ${({ theme }) => theme.spacing(2, 0)};
` as typeof Container;

type AppLayoutProps = React.PropsWithChildren<{}>;

function AppLayout({ children }: AppLayoutProps) {
  const [isSimpleLayout, setIsSimpleLayout] = useState(false);

  return (
    <AppLayoutProvider onIsSimpleLayoutChange={setIsSimpleLayout}>
      {!isSimpleLayout && (
        <>
          <HideOnScroll>
            <AppHeader />
          </HideOnScroll>
          {/* For toolbar offset */}
          <Toolbar />
        </>
      )}
      <StyledContainer maxWidth="lg" component="main">
        {!isSimpleLayout && <AppDrawer />}
        <Box
          // To make the content fill rest of the space
          // after the drawer
          flexGrow={1}
        >
          {children}
        </Box>
      </StyledContainer>
    </AppLayoutProvider>
  );
}

export default AppLayout;
