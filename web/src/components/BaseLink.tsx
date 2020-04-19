import React from "react";
import ReactRouterLink from "./ReactRouterLink";
import { Link, LinkProps } from "@material-ui/core";

const BaseLink = React.forwardRef<never, LinkProps<typeof ReactRouterLink>>(
  (props, ref) => <Link ref={ref} component={ReactRouterLink} {...props} />,
);

export default BaseLink;
