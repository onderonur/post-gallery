import React from 'react';
// TODO: @types/react-facebook-login doesn't have the definitions for
// render props component.
// So, we ignored the typechecking here.
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { SocialAccountType } from '@src/generated/graphql';
import SocialButton, { SocialButtonProps } from '@src/components/SocialButton';

type FacebookLoginButtonProps = React.PropsWithChildren<
  {
    onSuccess: (token: string) => void;
  } & Pick<SocialButtonProps, 'loading' | 'error'>
>;

function FacebookLoginButton({
  children,
  onSuccess,
  loading,
  error,
}: FacebookLoginButtonProps) {
  return (
    <>
      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_OAUTH_APP_ID}
        callback={async (userInfo: ReactFacebookLoginInfo) => {
          const { accessToken } = userInfo;
          onSuccess(accessToken);
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render={({ isDisabled, onClick }: any) => (
          <SocialButton
            socialAccountType={SocialAccountType.Facebook}
            loading={loading}
            disabled={isDisabled}
            error={error}
            onClick={onClick}
          >
            {children}
          </SocialButton>
        )}
        cookie={false}
      />
    </>
  );
}

export default FacebookLoginButton;
