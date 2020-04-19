import React from "react";
import { DialogTitle, Typography, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useBaseDialogContext } from "..";
import BaseIconButton from "../../BaseIconButton";

interface OwnProps {
  hideCloseButton?: boolean;
  noWrap?: boolean;
}

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 2),
  },
}));

const BaseDialogTitle: React.FC<OwnProps> = ({
  children,
  hideCloseButton,
  noWrap,
}) => {
  const classes = useStyles();
  const { onClose } = useBaseDialogContext();

  return (
    <DialogTitle className={classes.title} disableTypography>
      <Typography variant="h6" noWrap={noWrap}>
        {children}
      </Typography>
      {onClose && !hideCloseButton && (
        <BaseIconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </BaseIconButton>
      )}
    </DialogTitle>
  );
};

export default BaseDialogTitle;
