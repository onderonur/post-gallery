import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import { FlexRow } from './Utils';

interface LoadingProps {
  percent?: number;
}

const Loading = ({ percent }: LoadingProps) => {
  return (
    <FlexRow justifyContent="center">
      <Box padding={1}>
        <CircularProgress
          variant={
            typeof percent === 'number' && percent < 100 ? 'static' : undefined
          }
          value={percent}
        />
      </Box>
    </FlexRow>
  );
};

export default Loading;
