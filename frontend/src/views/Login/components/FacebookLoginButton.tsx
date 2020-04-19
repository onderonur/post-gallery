import React, { useState } from "react";
import SocialLoginButton from "./SocialLoginButton";
// TODO: @types/react-facebook-login doesn't have the definitions for
// render props component.
// So, we ignored the typechecking here.
// @ts-ignore
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { ReactFacebookLoginInfo } from "react-facebook-login";
import axios from "axios";
import { redirectToHome, AUTH_PROVIDERS } from "@/utils";
import FacebookIcon from "./FacebookIcon";

const FacebookLoginButton = () => {
  const [isLoginVerified, setIsLoginVerified] = useState<boolean>(false);
  return (
    <FacebookLogin
      appId={process.env.FACEBOOK_OAUTH_APP_ID}
      callback={(userInfo: ReactFacebookLoginInfo) => {
        const { accessToken } = userInfo;
        axios
          .post("/api/auth/verify", {
            providerToken: accessToken,
            provider: AUTH_PROVIDERS.facebook,
          })
          .then(({ data }) => {
            const { verified } = data;
            setIsLoginVerified(verified);
            if (verified) {
              redirectToHome();
            }
          });
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render={({ isDisabled, onClick }: any) => (
        <SocialLoginButton
          providerName={AUTH_PROVIDERS.facebook}
          isLoginVerified={isLoginVerified}
          icon={<FacebookIcon />}
          backgroundColor="#4267b2"
          fontColor="#fff"
          // TODO: Will fix this color, this is same with bgColor
          activeBackgroundColor="#4267b2"
          disabled={isDisabled}
          onClick={onClick}
        />
      )}
      cookie={false}
    />
  );
};

export default FacebookLoginButton;
