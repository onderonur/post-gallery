import React from "react";
import styled from "styled-components";
import { Typography, TypographyProps } from "@material-ui/core";

export const BoldText = styled(Typography)`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
` as typeof Typography;

type SecondaryTextProps = Omit<TypographyProps, "color">;

export const SecondaryText: React.FC<SecondaryTextProps> = props => {
  return <Typography color="textSecondary" {...props} />;
};
