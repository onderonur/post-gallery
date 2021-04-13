import React from 'react';
import BaseLink from '@src/modules/routing/BaseLink';
import { Bold } from '@src/modules/styling/StylingUtils';
import Linkify, { Props as LinkifyProps } from 'react-linkify';

const linkifyComponentDecorator: LinkifyProps['componentDecorator'] = (
  href,
  text,
  key,
) => (
  <BaseLink key={key} href={href} target="_blank" rel="noopener noreferrer">
    <Bold>{text}</Bold>
  </BaseLink>
);

type BaseLinkifyProps = React.PropsWithChildren<{}>;

const BaseLinklify = React.memo<BaseLinkifyProps>(function BaseLinklify({
  children,
}) {
  return (
    <Linkify componentDecorator={linkifyComponentDecorator}>{children}</Linkify>
  );
});

export default BaseLinklify;
