import { Tooltip, TooltipProps } from '@material-ui/core';
import React from 'react';

type ShareButtonTooltipProps = Pick<TooltipProps, 'children'> & {
  name: string;
};

const ShareButtonTooltip = React.memo<ShareButtonTooltipProps>(
  ({ name, children }) => {
    const title = `Share on ${name}`;
    return <Tooltip title={title}>{children}</Tooltip>;
  },
);

export default ShareButtonTooltip;
