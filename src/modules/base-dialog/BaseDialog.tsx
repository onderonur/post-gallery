import React from 'react';
import { Dialog, DialogProps } from '@material-ui/core';
import BaseDialogProvider from './BaseDialogContext';

export type BaseDialogProps = Pick<
  DialogProps,
  'open' | 'maxWidth' | 'scroll'
> & {
  onClose: VoidFunction;
};

const BaseDialog: React.FC<BaseDialogProps> = ({
  open,
  maxWidth = 'lg',
  scroll = 'body',
  onClose,
  children,
}) => {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={maxWidth}
      scroll={scroll}
      onClose={onClose}
    >
      <BaseDialogProvider onClose={onClose}>{children}</BaseDialogProvider>
    </Dialog>
  );
};

export default BaseDialog;
