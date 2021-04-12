import React from 'react';
import { Box, BoxProps } from '@material-ui/core';

function FlexCol(props: BoxProps) {
  return <Box display="flex" flexDirection="column" {...props} />;
}

export default FlexCol;
