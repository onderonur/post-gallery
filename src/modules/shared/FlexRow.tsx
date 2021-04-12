import React from 'react';
import { Box, BoxProps } from '@material-ui/core';

function FlexRow(props: BoxProps) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" {...props} />
  );
}

export default FlexRow;
