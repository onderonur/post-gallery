import React from "react";
import SocialLoginButton from "./SocialLoginButton";
import { ReactComponent as GoogleIcon } from "assets/google-icon.svg";
import { colors } from "@material-ui/core";

const GoogleLoginButton = () => {
  return (
    <SocialLoginButton
      providerName="Google"
      icon={<GoogleIcon />}
      href="/auth/google"
      backgroundColor={colors.common.white}
      fontColor="#737373"
      activeBackgroundColor="#e5e5e5"
    />
  );
};

export default GoogleLoginButton;
