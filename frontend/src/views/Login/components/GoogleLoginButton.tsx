import React, { useState } from "react";
import SocialLoginButton from "./SocialLoginButton";
import { colors } from "@material-ui/core";
import GoogleIcon from "./GoogleIcon";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import axios from "axios";
import { redirectToHome, AUTH_PROVIDERS } from "@/utils";

const GoogleLoginButton = () => {
  const [isLoginVerified, setIsLoginVerified] = useState<boolean>(false);
  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
      render={({ onClick, disabled }) => (
        <SocialLoginButton
          providerName={AUTH_PROVIDERS.google}
          isLoginVerified={isLoginVerified}
          icon={<GoogleIcon />}
          backgroundColor={colors.common.white}
          fontColor="#737373"
          activeBackgroundColor="#e5e5e5"
          disabled={disabled}
          onClick={onClick}
        />
      )}
      onSuccess={(response) => {
        const authResponse = (response as GoogleLoginResponse).getAuthResponse();
        const idToken = authResponse.id_token;
        axios
          .post("/api/auth/login", {
            providerToken: idToken,
            provider: AUTH_PROVIDERS.google,
          })
          .then(({ data }) => {
            const { verified } = data;
            setIsLoginVerified(verified);
            if (verified) {
              redirectToHome();
            }
          });
      }}
      // eslint-disable-next-line no-console
      onFailure={(error) => console.log(error)}
      cookiePolicy="none"
    />
  );
};

export default GoogleLoginButton;
