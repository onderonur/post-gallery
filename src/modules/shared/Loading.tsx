import React from 'react';
import { CircularProgress, RootRef } from '@material-ui/core';
import FlexRow from '@src/modules/shared/FlexRow';

interface LoadingProps {
  percent?: number;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(function Loading(
  { percent },
  ref,
) {
  const content = (
    <FlexRow justifyContent="center" padding={1}>
      <CircularProgress
        variant={
          typeof percent === 'number' && percent < 100
            ? 'determinate'
            : undefined
        }
        value={percent}
      />
    </FlexRow>
  );

  if (!ref) {
    return content;
  }

  return <RootRef rootRef={ref}>{content}</RootRef>;
});

export default Loading;
