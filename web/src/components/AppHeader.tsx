import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ReactRouterLink from "./ReactRouterLink";
import styled from "styled-components";
import BaseButton from "./BaseButton";
import { useViewer } from "./ViewerProvider";
import { Box } from "@material-ui/core";
import BaseLink from "./BaseLink";
import CreatePostDialog from "./CreatePostDialog";
import UserMenu from "./UserMenu";
import FlexRow from "./FlexRow";
import URLS from "constants/urls";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppHeaderOffset = styled.div(({ theme }) => theme.mixins.toolbar as any);

const LoginButton = () => {
  return (
    <BaseButton
      variant="text"
      color="inherit"
      to={URLS.login}
      component={ReactRouterLink}
    >
      Login
    </BaseButton>
  );
};

const AppHeaderLink = styled(BaseLink)`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  &:hover {
    text-decoration: none;
  }
`;

const ButtonsContainer = styled(FlexRow)`
  > * {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
`;

const AppHeader: React.RefForwardingComponent<unknown> = (props, ref) => {
  const viewer = useViewer();
  return (
    <>
      <AppBar ref={ref} position="fixed" color="inherit">
        <Toolbar>
          <AppHeaderLink to={URLS.posts} variant="h6" color="primary">
            Post Gallery
          </AppHeaderLink>
          <Box flex={1} />
          <ButtonsContainer>
            <CreatePostDialog />
            {viewer ? <UserMenu /> : <LoginButton />}
          </ButtonsContainer>
        </Toolbar>
      </AppBar>
      <AppHeaderOffset />
    </>
  );
};

export default React.forwardRef(AppHeader);
