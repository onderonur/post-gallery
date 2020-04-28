import React from "react";
import { Typography } from "@material-ui/core";

interface VerifiedLoginInfoProps {
  isVerified: boolean;
}

const VerifiedLoginInfo = React.memo<VerifiedLoginInfoProps>(
  ({ isVerified }) => {
    if (!isVerified) {
      return null;
    }

    return (
      <Typography color="primary">
        You are now logged in and will be automatically redirected.
      </Typography>
    );
  },
);

export default VerifiedLoginInfo;
