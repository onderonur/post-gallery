import React from "react";
import { Link, LinkProps } from "@material-ui/core";
import NextLink from "./NextLink";

const BaseLink = React.forwardRef<never, LinkProps<typeof NextLink>>(
  (props, ref) => <Link ref={ref} component={NextLink} {...props} />,
);

export default BaseLink;
