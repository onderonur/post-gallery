import React from "react";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { Container, Divider, useTheme } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useHideAppHeader } from "components/AppLayout";
import { useHistory, Redirect } from "react-router-dom";
import FlexRow from "components/FlexRow";
import { FlexCol } from "components/FlexCol";
import BaseIconButton from "components/BaseIconButton";
import { BoldText } from "components/Text";
import URLS from "constants/urls";
import useRequireAuth from "hooks/useRequireAuth";

const LoginView = () => {
  useHideAppHeader();
  const history = useHistory();
  const theme = useTheme();
  const requireAuth = useRequireAuth();

  return requireAuth(
    <Redirect to={URLS.posts} />,
    <div>
      <FlexRow justifyContent="flex-end">
        <BaseIconButton onClick={() => history.goBack()}>
          <CloseIcon />
        </BaseIconButton>
      </FlexRow>
      <Container maxWidth="sm" component="main">
        <FlexCol>
          <BoldText
            variant="h3"
            component="h1"
            color="primary"
            align="center"
            gutterBottom
          >
            Post Gallery
          </BoldText>
          <Divider />
          <FlexCol marginY={3} border={theme.shadows[20]}>
            <GoogleLoginButton />
          </FlexCol>
        </FlexCol>
      </Container>
    </div>,
  );
};

export default LoginView;
