import React from "react";
import SocialSignInButton from "SocialSignInButton";
import { ReactComponent as GoogleIcon } from "assets/google-icon.svg";
import { colors } from "@material-ui/core";

const GoogleSignInButton = () => {
  return (
    <SocialSignInButton
      providerName="Google"
      icon={<GoogleIcon />}
      href="/auth/google"
      backgroundColor={colors.common.white}
      fontColor="#737373"
      activeBackgroundColor="#e5e5e5"
    />
  );
};

export default GoogleSignInButton;
