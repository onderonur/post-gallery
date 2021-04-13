import React from 'react';
import GoogleLoginButton from '@src/modules/social-buttons/GoogleLoginButton';
import FacebookLoginButton from '@src/modules/social-buttons/FacebookLoginButton';
import { Container, Box, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BaseIconButton from '@src/modules/shared/BaseIconButton';
import { Bold } from '@src/modules/styling/StylingUtils';
import FlexCol from '@src/modules/shared/FlexCol';
import { useRequireAuth } from '@src/modules/auth/AuthHooks';
import { useRouter } from 'next/router';
import Redirect from '@src/modules/routing/Redirect';
import { APP_TITLE } from '@src/modules/shared/SharedUtils';
import Stack from '@src/modules/shared/Stack';
import { useLazyAsync } from '@src/modules/shared/SharedHooks';
import restClient from '@src/modules/rest-client/RestClient';
import { SocialAccountType } from '@src/generated/graphql';
import { redirectToHome, urls } from '@src/modules/routing/RoutingUtils';
import styled from '@emotion/styled';
import BasePaper from '@src/modules/shared/BasePaper';
import FullScreenView from '@src/modules/shared/FullScreenView';
import { NextSeo } from 'next-seo';

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
      <NextSeo title="Login" />
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
              <Bold>{APP_TITLE}</Bold>
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
