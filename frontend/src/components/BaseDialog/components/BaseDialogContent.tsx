import React from "react";
import {
  DialogContent,
  CircularProgress,
  Box,
  makeStyles,
} from "@material-ui/core";

interface OwnProps {
  loading?: boolean;
}

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
  },
}));

const BaseDialogContent: React.FC<OwnProps> = ({ loading, children }) => {
  const classes = useStyles();
  const content = loading ? (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    children
  );

  return (
    <DialogContent className={classes.content} dividers={true}>
      {content}
    </DialogContent>
  );
};

export default BaseDialogContent;
