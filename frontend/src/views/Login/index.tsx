import React from "react";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { Container, Divider, useTheme } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useHideAppHeader } from "@/components/AppLayout";
import FlexRow from "@/components/FlexRow";
import { FlexCol } from "@/components/FlexCol";
import BaseIconButton from "@/components/BaseIconButton";
import { BoldText } from "@/components/Text";
import useRequireAuth from "@/hooks/useRequireAuth";
import { useRouter } from "next/router";
import Redirect from "@/components/Redirect";
import URLS from "@/constants/urls";

const LoginView = () => {
  useHideAppHeader();
  const router = useRouter();
  const theme = useTheme();
  const requireAuth = useRequireAuth();

  return requireAuth(
    <Redirect href={URLS.posts} replace />,
    <div>
      <FlexRow justifyContent="flex-end">
        <BaseIconButton onClick={() => router.back()}>
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