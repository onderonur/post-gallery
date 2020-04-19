import React from "react";
import { Link, LinkProps } from "react-router-dom";

export type ReactRouterLinkProps = LinkProps;

const ReactRouterLink: React.RefForwardingComponent<never, LinkProps> = (
  props: LinkProps,
  ref,
) => {
  return <Link ref={ref} {...props} />;
};

export default React.forwardRef(ReactRouterLink);
