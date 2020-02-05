import React from "react";
import { Link, LinkProps } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactRouterLink: React.RefForwardingComponent<any, LinkProps> = (
  props: LinkProps,
  ref,
) => {
  return <Link ref={ref} {...props} />;
};

export default React.forwardRef(ReactRouterLink);
