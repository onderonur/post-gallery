import React from "react";
import { Typography, TypographyProps, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export const BoldText = <C extends React.ElementType>({
  className,
  ...rest
}: // https://material-ui.com/guides/typescript/#usage-of-component-prop
TypographyProps<C, { component?: C }>) => {
  const classes = useStyles();
  return <Typography className={clsx(className, classes.bold)} {...rest} />;
};

type SecondaryTextProps = Omit<TypographyProps, "color">;

export const SecondaryText: React.FC<SecondaryTextProps> = (props) => {
  return <Typography color="textSecondary" {...props} />;
};
