import { css } from '@emotion/react';
import { Box, BoxProps } from '@material-ui/core';
import styled from '@emotion/styled';

type StackProps = BoxProps & {
  spacing: number;
  // To make it a required prop
  flexDirection: BoxProps['flexDirection'];
};

const Stack = styled(Box)<StackProps>`
  display: flex;
  align-items: ${({ alignItems, flexDirection }) =>
    alignItems ?? flexDirection === 'row' ? 'center' : undefined};
  > *:not(:last-child) {
    ${({ flexDirection, theme, spacing }) =>
      flexDirection === 'row'
        ? css`
            margin-right: ${theme.spacing(spacing)}px;
          `
        : css`
            margin-bottom: ${theme.spacing(spacing)}px;
          `}
  }
`;

export default Stack;
