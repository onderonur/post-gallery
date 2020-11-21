import React from 'react';
import { DialogTitle, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BaseIconButton from '../../BaseIconButton';
import { useBaseDialogContext } from '../contexts/BaseDialogContext';
import styled from '@emotion/styled';

const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1, 2)};
`;

type BaseDialogTitleProps = React.PropsWithChildren<{
  hideCloseButton?: boolean;
  noWrap?: boolean;
}>;

function BaseDialogTitle({
  children,
  hideCloseButton,
  noWrap,
}: BaseDialogTitleProps) {
  const { onClose } = useBaseDialogContext();

  return (
    <StyledDialogTitle disableTypography>
      <Typography variant="h6" component="h3" noWrap={noWrap}>
        {children}
      </Typography>
      {onClose && !hideCloseButton && (
        <BaseIconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </BaseIconButton>
      )}
    </StyledDialogTitle>
  );
}

export default BaseDialogTitle;
