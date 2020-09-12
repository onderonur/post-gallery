import React from 'react';
import GoogleLoginButton from '@src/components/GoogleLoginButton';
import FacebookLoginButton from '@src/components/FacebookLoginButton';
import { Container, Box, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BaseIconButton from '@src/components/BaseIconButton';
import { Bold, FlexCol, FullScreenView } from '@src/components/Utils';
import useRequireAuth from '@src/hooks/useRequireAuth';
import { useRouter } from 'next/router';
import Redirect from '@src/components/Redirect';
import urls from '@src/utils/urls';
import { appTitle } from '@src/utils/appTitle';
import Stack from '@src/components/Stack';
import useLazyAsync from '@src/hooks/useLazyAsync';
import restClient from '@src/utils/restClient';
import { SocialAccountType } from '@src/generated/graphql';
import { redirectToHome } from '@src/utils/redirectToHome';
import styled from '@src/utils/styled';
import BasePaper from '@src/components/BasePaper';
import LoginSeo from './components/LoginSeo';

const StyledContainer = styled(Container)`
  margin-bottom: ${({ theme }) => theme.spacing(10)}px;
  padding: ${({ theme }) => theme.spacing(4, 2)};
` as typeof Container;

const loginAndRedirect = (socialAccountType: SocialAccountType) => async (
  token: string,
) => {
  await restClient.auth.login({ socialAccountType, token });
  redirectToHome();
};

function LoginView() {
  const router = useRouter();
  const requireAuth = useRequireAuth();

  const [
    loginWithGoogle,
    { loading: isLoadingLoginWithGoogle, error: googleError },
  ] = useLazyAsync(loginAndRedirect(SocialAccountType.Google));

  const [
    loginWithFacebook,
    { loading: isLoadingLoginWithFacebook, error: facebookError },
  ] = useLazyAsync(loginAndRedirect(SocialAccountType.Facebook));

  return requireAuth(
    <Redirect href={urls.home.href} replace />,
    <FullScreenView justifyContent="center">
      <LoginSeo />
      <StyledContainer maxWidth="xs" component={BasePaper}>
        <Box position="absolute" margin={1} top={0} right={0}>
          <BaseIconButton onClick={() => router.push(urls.home.href)}>
            <CloseIcon />
          </BaseIconButton>
        </Box>
        <FlexCol>
          <Box marginBottom={2}>
            <Typography
              variant="h4"
              component="h1"
              color="primary"
              align="center"
              gutterBottom
            >
              <Bold>{appTitle}</Bold>
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="textSecondary">
            Log in with a social account
          </Typography>
          <Stack spacing={1} flexDirection="column">
            <GoogleLoginButton
              onSuccess={loginWithGoogle}
              loading={isLoadingLoginWithGoogle}
              error={googleError}
            >
              Log In With Google
            </GoogleLoginButton>
            <FacebookLoginButton
              onSuccess={loginWithFacebook}
              loading={isLoadingLoginWithFacebook}
              error={facebookError}
            >
              Log In With Facebook
            </FacebookLoginButton>
          </Stack>
        </FlexCol>
      </StyledContainer>
    </FullScreenView>,
  );
}

export default LoginView;
