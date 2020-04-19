import React from "react";
import { Box, BoxProps } from "@material-ui/core";

export const FlexCol: React.FC<BoxProps> = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      {...props}
    />
  );
};
