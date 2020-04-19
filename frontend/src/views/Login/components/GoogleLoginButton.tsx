import React from "react";
import SocialLoginButton from "./SocialLoginButton";
import { colors } from "@material-ui/core";
import GoogleIcon from "./GoogleIcon";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import axios from "axios";
import { redirectToHome } from "@/utils";

const GoogleLoginButton = () => {
  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
      render={({ onClick, disabled }) => (
        <SocialLoginButton
          providerName="Google"
          icon={<GoogleIcon />}
          backgroundColor={colors.common.white}
          fontColor="#737373"
          activeBackgroundColor="#e5e5e5"
          disabled={disabled}
          onClick={onClick}
        />
      )}
      onSuccess={(response) => {
        const idToken = (response as GoogleLoginResponse).getAuthResponse()
          .id_token;
        axios.post("/api/auth/google", { idToken }).then(({ data }) => {
          if (data.verified) {
            redirectToHome();
          }
        });
      }}
      onFailure={(error) => console.log(error)}
      cookiePolicy="none"
    />
  );
};

export default GoogleLoginButton;
