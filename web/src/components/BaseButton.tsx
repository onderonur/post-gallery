import React from "react";
import {
  Button,
  CircularProgress,
  ButtonProps,
  ButtonTypeMap,
} from "@material-ui/core";
import styled from "styled-components";
import usePrivateAction from "hooks/usePrivateAction";

const ButtonSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
`;

export type BaseButtonProps<
  T extends React.ElementType = ButtonTypeMap["defaultComponent"]
> = ButtonProps<T, { component?: T }> & {
  isAuthRequired?: boolean;
};

// https://material-ui.com/guides/typescript/#usage-of-component-prop
const BaseButton = <T extends React.ElementType>({
  loading,
  disabled,
  children,
  variant = "contained",
  isAuthRequired,
  onClick,
  ...props
}: BaseButtonProps<T>) => {
  const privateOnClick = usePrivateAction({ isAuthRequired, action: onClick });
  return (
    <Button
      variant={variant}
      disabled={loading || disabled}
      onClick={privateOnClick}
      {...props}
    >
      {children}
      {loading && <ButtonSpinner size={24} />}
    </Button>
  );
};

export default BaseButton;
