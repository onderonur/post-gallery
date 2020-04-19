import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IconButton, IconButtonProps, makeStyles } from "@material-ui/core";
import usePrivateAction from "@/hooks/usePrivateAction";

export interface BaseIconButtonProps extends IconButtonProps {
  loading?: boolean;
  isAuthRequired?: boolean;
}

const useStyles = makeStyles((theme) => ({
  loading: {
    position: "absolute",
    zIndex: 1,
  },
}));

const BaseIconButton: React.FC<BaseIconButtonProps> = ({
  loading,
  children,
  size,
  isAuthRequired,
  onClick,
  ...rest
}) => {
  const classes = useStyles();
  const privateOnClick = usePrivateAction({ isAuthRequired, action: onClick });
  const isSmall = size === "small";
  return (
    <IconButton size={size} onClick={privateOnClick} {...rest}>
      {children}
      {loading && (
        <CircularProgress
          className={classes.loading}
          size={isSmall ? 30 : 48}
        />
      )}
    </IconButton>
  );
};

export default BaseIconButton;
