import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RouterLink from "./ReactRouterLink";
import styled from "styled-components";
import useListenAuth from "hooks/useListenAuth";

const Title = styled(Typography)`
  flex-grow: 1;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppHeaderOffset = styled.div(({ theme }) => theme.mixins.toolbar as any);

const LogoutButton = () => {
  return (
    <Button color="inherit" href="/auth/logout">
      Logout
    </Button>
  );
};

const LoginButton = () => {
  return (
    <Button color="inherit" to="/login" component={RouterLink}>
      Login
    </Button>
  );
};

const AppHeader = () => {
  const { viewer, loading } = useListenAuth();
  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Title variant="h6">Post Gallery</Title>
          {loading ? null : viewer ? <LogoutButton /> : <LoginButton />}
        </Toolbar>
      </AppBar>
      <AppHeaderOffset />
    </>
  );
};

export default AppHeader;
