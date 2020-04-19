import React from "react";
import Link, { LinkProps } from "next/link";
import { makeStyles, Omit } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  anchor: {
    textDecoration: "none",
  },
}));

export type NextLinkProps = Omit<React.PropsWithChildren<LinkProps>, "as"> & {
  className?: string;
  hrefAs?: LinkProps["as"];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NextLink: React.ForwardRefRenderFunction<any, NextLinkProps> = (
  {
    children,
    href,
    hrefAs,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    // To pass the any other props like "className" etc to anchor.
    className,
    ...rest
  },
  ref,
) => {
  const classes = useStyles();
  return (
    <Link
      ref={ref}
      // If any other prop is passed to next/link,
      // it gives a propType warning.
      as={hrefAs}
      {...{ href, passHref, prefetch, replace, scroll, shallow }}
    >
      <a className={clsx(classes.anchor, className)} {...rest}>
        {children}
      </a>
    </Link>
  );
};

export default React.forwardRef(NextLink);
