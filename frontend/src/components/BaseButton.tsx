import React from "react";
import {
  Button,
  CircularProgress,
  ButtonProps,
  ButtonTypeMap,
  makeStyles,
} from "@material-ui/core";
import usePrivateAction from "@/hooks/usePrivateAction";

export type BaseButtonProps<
  T extends React.ElementType = ButtonTypeMap["defaultComponent"]
> = ButtonProps<T, { component?: T }> & {
  isAuthRequired?: boolean;
};

const useStyles = makeStyles((theme) => ({
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

// https://material-ui.com/guides/typescript/#usage-of-component-prop
const BaseButton = <C extends React.ElementType>({
  loading,
  disabled,
  children,
  variant = "contained",
  isAuthRequired,
  onClick,
  ...props
}: BaseButtonProps<C>) => {
  const classes = useStyles();
  const privateOnClick = usePrivateAction({ isAuthRequired, action: onClick });
  return (
    <Button
      variant={variant}
      disabled={loading || disabled}
      onClick={privateOnClick}
      {...props}
    >
      {children}
      {loading && <CircularProgress className={classes.loading} size={24} />}
    </Button>
  );
};

export default BaseButton;
