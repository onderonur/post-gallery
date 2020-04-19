import React from "react";
import { BoxProps, Box } from "@material-ui/core";

const FlexRow: React.FC<BoxProps> = props => {
  return <Box display="flex" alignItems="center" {...props} />;
};

export default FlexRow;
