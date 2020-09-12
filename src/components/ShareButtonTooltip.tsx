import { Tooltip } from '@material-ui/core';
import React from 'react';

interface ShareButtonTooltipProps {
  name: string;
}

const ShareButtonTooltip = React.memo<
  React.PropsWithChildren<ShareButtonTooltipProps>
>(({ name, children }) => {
  const title = `Share on ${name}`;
  return (
    <Tooltip title={title}>
      <>{children}</>
    </Tooltip>
  );
});

export default ShareButtonTooltip;
