import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import styled from '@src/utils/styled';
import { useSimpleLayout } from './AppLayout/contexts/AppLayoutContext';
import { Box, BoxProps } from '@material-ui/core';

export const Bold = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

export const BreakWord = styled.span`
  white-space: pre-wrap;
  word-break: break-word;
`;

type FullScreenViewProps = React.PropsWithChildren<{
  justifyContent: CSSProperties['justifyContent'];
}>;

const FullScreenRoot = styled.div<FullScreenViewProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifyContent }) => justifyContent};
`;

export function FullScreenView(props: FullScreenViewProps) {
  useSimpleLayout();
  return <FullScreenRoot {...props} />;
}

export function FlexCol(props: BoxProps) {
  return <Box display="flex" flexDirection="column" {...props} />;
}

export function FlexRow(props: BoxProps) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" {...props} />
  );
}
