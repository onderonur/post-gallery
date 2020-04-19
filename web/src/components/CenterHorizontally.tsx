import React from "react";
import { Box, BoxProps } from "@material-ui/core";

const CenterHorizontally: React.FC<BoxProps> = props => {
  return <Box {...props} marginX="auto" />;
};

export default CenterHorizontally;
