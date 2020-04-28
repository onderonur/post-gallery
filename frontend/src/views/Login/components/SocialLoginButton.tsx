import React from "react";
import { makeStyles, Theme, Box } from "@material-ui/core";
import BaseButton, { BaseButtonProps } from "@/components/BaseButton";
import useRequireAuth from "@/hooks/useRequireAuth";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import VerifiedLoginInfo from "./VerifiedLoginInfo";

interface StyleProps {
  backgroundColor: CSSProperties["backgroundColor"];
  activeBackgroundColor: CSSProperties["backgroundColor"];
  fontColor: CSSProperties["color"];
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  button: {
    width: "100%",
    height: 40,
    borderWidth: 0,
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    color: ({ fontColor }) => fontColor,
    borderRadius: 5,
    whiteSpace: "nowrap",
    boxShadow: "1px 1px 0px 1px rgba(0, 0, 0, 0.05)",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-in-out",
    padding: 0,
    textAlign: "left",
    "&:hover, &:focus": {
      boxShadow: "1px 4px 5px 1px rgba(0, 0, 0, 0.1)",
    },
    "&:active": {
      backgroundColor: ({ activeBackgroundColor }) => activeBackgroundColor,
      boxShadow: "none",
      transitionDuration: "10ms",
    },
  },
  icon: {
    display: "inline-block",
    verticalAlign: "middle",
    margin: "0 0 4px 8px",
    width: 18,
    height: 18,
    boxSizing: "border-box",
  },
  text: {
    display: "inline-block",
    verticalAlign: "middle",
    padding: "0 24px",
    fontSize: 14,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
}));

type SocialLoginButtonProps = StyleProps & {
  icon: React.ReactNode;
  providerName: string;
  isLoginVerified: boolean;
  disabled: BaseButtonProps["disabled"];
  onClick: BaseButtonProps["onClick"];
};

// Thanks to: https://codepen.io/slukas23/pen/qwMevr
const SocialLoginButton = React.memo<SocialLoginButtonProps>(
  ({
    icon,
    backgroundColor,
    fontColor,
    activeBackgroundColor,
    providerName,
    isLoginVerified,
    disabled,
    onClick,
  }) => {
    const classes = useStyles({
      activeBackgroundColor,
      backgroundColor,
      fontColor,
    });
    const requireAuth = useRequireAuth();
    return requireAuth(
      null,
      <div>
        <BaseButton
          className={classes.button}
          disabled={disabled}
          onClick={onClick}
        >
          <span className={classes.icon}>{icon}</span>
          <span className={classes.text}>Log in with {providerName}</span>
        </BaseButton>
        <Box marginTop={0.5}>
          <VerifiedLoginInfo isVerified={isLoginVerified} />
        </Box>
      </div>,
    );
  },
);

export default SocialLoginButton;
