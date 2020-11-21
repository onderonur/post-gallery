import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IconButton, IconButtonProps } from '@material-ui/core';
import usePrivateAction from '@src/hooks/usePrivateAction';
import styled from '@emotion/styled';

const Loading = styled(CircularProgress)`
  position: absolute;
  z-index: 1;
`;

export interface BaseIconButtonProps extends IconButtonProps {
  loading?: boolean;
  isAuthRequired?: boolean;
}

const BaseIconButton: React.FC<BaseIconButtonProps> = ({
  loading,
  disabled,
  size,
  isAuthRequired,
  children,
  onClick,
  ...rest
}) => {
  const privateOnClick = usePrivateAction({ isAuthRequired, action: onClick });
  const isSmall = size === 'small';
  return (
    <IconButton
      size={size}
      onClick={privateOnClick}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
      {loading && <Loading size={isSmall ? 30 : 48} />}
    </IconButton>
  );
};

export default BaseIconButton;
