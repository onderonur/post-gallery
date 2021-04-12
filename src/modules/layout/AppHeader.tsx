import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BaseButton from '@src/modules/shared/BaseButton';
import { useViewer } from '../auth/ViewerContext';
import { Box } from '@material-ui/core';
import CreatePostDialog from '../post/CreatePostDialog';
import UserMenu from './UserMenu';
import { urls } from '@src/modules/routing/RoutingUtils';
import NextLink from '@src/modules/routing/NextLink';
import Stack from '@src/modules/shared/Stack';
import styled from '@emotion/styled';
import AppTitle from './AppTitle';

const LoginButton = React.memo(function LoginButton() {
  return (
    <BaseButton
      variant="text"
      color="inherit"
      href={urls.login.href}
      component={NextLink}
    >
      Login
    </BaseButton>
  );
});

const StyledAppBar = styled(AppBar)`
  /* To place AppBar in front of the Drawer */
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

const StyledToolbar = styled(Toolbar)`
  max-width: ${({ theme }) => theme.breakpoints.width('lg')}px;
  width: 100%;
  margin: auto;
`;

const AppHeader = React.memo(
  React.forwardRef(function AppHeader(props, ref) {
    const viewer = useViewer();
    return (
      <>
        <StyledAppBar ref={ref} position="fixed" color="inherit" elevation={0}>
          <StyledToolbar>
            <AppTitle />
            <Box flex={1} />
            <Stack spacing={1} flexDirection="row" marginX={1}>
              <CreatePostDialog />
              {viewer ? <UserMenu /> : <LoginButton />}
            </Stack>
          </StyledToolbar>
        </StyledAppBar>
      </>
    );
  }),
);

export default AppHeader;
