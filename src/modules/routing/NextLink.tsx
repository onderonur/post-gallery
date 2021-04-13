import React from 'react';
import Link, { LinkProps } from 'next/link';
import styled from '@emotion/styled';
import { Omit } from '@src/types';

const Anchor = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export type NextLinkProps = React.PropsWithChildren<
  Omit<LinkProps, 'as' | 'passHref'>
> & {
  className?: string;
  hrefAs?: LinkProps['as'];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NextLink = React.forwardRef<HTMLAnchorElement, NextLinkProps>(
  function NextLink(
    {
      children,
      href,
      hrefAs,
      prefetch,
      replace,
      scroll,
      shallow,
      // To pass the any other props like "className" etc to anchor.
      ...rest
    },
    ref,
  ) {
    return (
      <Link
        // If any other prop is passed to next/link,
        // it gives a propType warning.
        as={hrefAs}
        {...{ href, prefetch, replace, scroll, shallow }}
        // If the child of Link is a custom component that wraps an <a> tag, you must add passHref to Link.
        // https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
        passHref={true}
      >
        <Anchor ref={ref} {...rest}>
          {children}
        </Anchor>
      </Link>
    );
  },
);

export default NextLink;
