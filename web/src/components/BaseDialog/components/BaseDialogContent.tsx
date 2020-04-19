import React from "react";
import { DialogContent, CircularProgress, Box } from "@material-ui/core";
import styled from "styled-components";

interface OwnProps {
  loading?: boolean;
}

const StyledDialogContent = styled(DialogContent)`
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

const BaseDialogContent: React.FC<OwnProps> = ({ loading, children }) => {
  const content = loading ? (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    children
  );

  return <StyledDialogContent dividers={true}>{content}</StyledDialogContent>;
};

export default BaseDialogContent;
