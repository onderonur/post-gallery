import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { FlexRow } from './Utils';

interface LoadingProps {
  percent?: number;
}

const Loading = ({ percent }: LoadingProps) => {
  return (
    <FlexRow justifyContent="center" padding={1}>
      <CircularProgress
        variant={
          typeof percent === 'number' && percent < 100 ? 'static' : undefined
        }
        value={percent}
      />
    </FlexRow>
  );
};

export default Loading;
