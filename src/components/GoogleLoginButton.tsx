import React, { useState } from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { Maybe, SocialAccountType } from '@src/generated/graphql';
import SocialButton, { SocialButtonProps } from '@src/components/SocialButton';

type GoogleLoginButtonProps = React.PropsWithChildren<
  {
    onSuccess: (token: string) => void;
  } & Pick<SocialButtonProps, 'loading' | 'error'>
>;

function GoogleLoginButton({
  children,
  onSuccess,
  loading,
  error,
}: GoogleLoginButtonProps) {
  const [loginButtonError, setLoginButtonError] = useState<Maybe<Error>>();
  return (
    <>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
        render={({ onClick, disabled }) => (
          <SocialButton
            socialAccountType={SocialAccountType.Google}
            loading={loading}
            disabled={disabled}
            error={error || loginButtonError}
            onClick={onClick}
          >
            {children}
          </SocialButton>
        )}
        onSuccess={async (response) => {
          const authResponse = (response as GoogleLoginResponse).getAuthResponse();
          const idToken = authResponse.id_token;
          onSuccess(idToken);
        }}
        onFailure={(error) => {
          let message = error.error;
          if (error.details) {
            message += `- ${error.details}`;
          }
          setLoginButtonError(new Error(message));
        }}
        cookiePolicy="none"
      />
    </>
  );
}

export default GoogleLoginButton;
