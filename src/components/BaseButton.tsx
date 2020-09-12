import React from 'react';
import {
  Button,
  CircularProgress,
  ButtonProps,
  ButtonTypeMap,
} from '@material-ui/core';
import usePrivateAction from '@src/hooks/usePrivateAction';
import styled from '@src/utils/styled';

export type BaseButtonProps<
  T extends React.ElementType = ButtonTypeMap['defaultComponent']
> = ButtonProps<T, { component?: T }> & {
  isAuthRequired?: boolean;
  loading?: boolean;
};

const loadingSize = 24;

const ButtonLoading = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -${loadingSize / 2}px;
  margin-left: -${loadingSize / 2}px;
`;

// https://material-ui.com/guides/typescript/#usage-of-component-prop
function BaseButton<T extends React.ElementType>({
  loading,
  disabled,
  children,
  variant = 'contained',
  isAuthRequired,
  disableElevation = true,
  onClick,
  ...props
}: BaseButtonProps<T>) {
  const privateOnClick = usePrivateAction({ isAuthRequired, action: onClick });
  return (
    <Button
      variant={variant}
      disabled={loading || disabled}
      disableElevation={disableElevation}
      onClick={privateOnClick}
      {...props}
    >
      {children}
      {loading && <ButtonLoading size={loadingSize} />}
    </Button>
  );
}

export default BaseButton;
