import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IconButton, IconButtonProps } from "@material-ui/core";
import usePrivateAction from "hooks/usePrivateAction";
import styled from "styled-components";

export interface BaseIconButtonProps extends IconButtonProps {
  loading?: boolean;
  isAuthRequired?: boolean;
}

const Loading = styled(CircularProgress)`
  position: absolute;
  z-index: 1;
`;

const BaseIconButton: React.FC<BaseIconButtonProps> = ({
  loading,
  children,
  size,
  isAuthRequired,
  onClick,
  ...rest
}) => {
  const privateOnClick = usePrivateAction({ isAuthRequired, action: onClick });
  const isSmall = size === "small";
  return (
    <IconButton size={size} onClick={privateOnClick} {...rest}>
      {children}
      {loading && <Loading size={isSmall ? 30 : 48} />}
    </IconButton>
  );
};

export default BaseIconButton;
