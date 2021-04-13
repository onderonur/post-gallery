import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import styled from '@emotion/styled';
import { useSimpleLayout } from '@src/modules/layout/AppLayoutContext';

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

function FullScreenView(props: FullScreenViewProps) {
  useSimpleLayout();
  return <FullScreenRoot {...props} />;
}

export default FullScreenView;
