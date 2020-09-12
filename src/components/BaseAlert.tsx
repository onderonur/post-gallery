import React from 'react';
import { Collapse } from '@material-ui/core';
import Alert, { AlertProps } from '@material-ui/lab/Alert';

type BaseAlertProps = Pick<AlertProps, 'severity' | 'onClose' | 'children'> & {
  isIn: boolean;
};

function BaseAlert({ isIn, ...rest }: BaseAlertProps) {
  return (
    <Collapse in={isIn}>
      <Alert {...rest} />
    </Collapse>
  );
}

export default BaseAlert;
