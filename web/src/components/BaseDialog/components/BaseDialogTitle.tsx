import React from "react";
import { DialogTitle, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useBaseDialogContext } from "..";
import BaseIconButton from "../../BaseIconButton";
import styled from "styled-components";

interface OwnProps {
  hideCloseButton?: boolean;
  noWrap?: boolean;
}

const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1, 2)};
`;

const BaseDialogTitle: React.FC<OwnProps> = ({
  children,
  hideCloseButton,
  noWrap,
}) => {
  const { onClose } = useBaseDialogContext();

  return (
    <StyledDialogTitle disableTypography>
      <Typography variant="h6" noWrap={noWrap}>
        {children}
      </Typography>
      {onClose && !hideCloseButton && (
        <BaseIconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </BaseIconButton>
      )}
    </StyledDialogTitle>
  );
};

export default BaseDialogTitle;
