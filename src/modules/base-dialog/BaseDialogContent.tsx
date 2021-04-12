import React from 'react';
import { DialogContent, CircularProgress, Box } from '@material-ui/core';
import styled from '@emotion/styled';

const StyledDialogContent = styled(DialogContent)`
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

type BaseDialogContentProps = React.PropsWithChildren<{
  loading?: boolean;
}>;

function BaseDialogContent({ loading, children }: BaseDialogContentProps) {
  const content = loading ? (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    children
  );

  return <StyledDialogContent dividers={true}>{content}</StyledDialogContent>;
}

export default BaseDialogContent;
