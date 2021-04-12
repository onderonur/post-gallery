import React, { useMemo } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';
import ShareButtonTooltip from './ShareButtonTooltip';
import { Maybe } from '@src/generated/graphql';
import Stack from '@src/modules/shared/Stack';
import { useTheme } from '@material-ui/core';

interface ShareButtonsProps {
  url: Maybe<string>;
}

const ShareButtons = React.memo<ShareButtonsProps>(({ url }) => {
  const shareButtonProps = useMemo(
    () => ({
      url: url ?? '',
    }),
    [url],
  );

  const theme = useTheme();
  const shareIconSize = theme.typography.fontSize * 2.5;

  const shareIconProps = useMemo(
    () => ({
      size: shareIconSize,
      // To make buttons vertically centered
      style: { display: 'flex' },
    }),
    [shareIconSize],
  );

  if (!url) {
    return null;
  }

  return (
    <Stack
      spacing={1}
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
    >
      <ShareButtonTooltip name="Facebook">
        <FacebookShareButton {...shareButtonProps}>
          <FacebookIcon {...shareIconProps} />
        </FacebookShareButton>
      </ShareButtonTooltip>
      <ShareButtonTooltip name="Twitter">
        <TwitterShareButton {...shareButtonProps}>
          <TwitterIcon {...shareIconProps} />
        </TwitterShareButton>
      </ShareButtonTooltip>
      <ShareButtonTooltip name="Reddit">
        <RedditShareButton {...shareButtonProps}>
          <RedditIcon {...shareIconProps} />
        </RedditShareButton>
      </ShareButtonTooltip>
    </Stack>
  );
});

export default ShareButtons;
