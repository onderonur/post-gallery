import React from 'react';
import BaseAlert from './BaseAlert';

interface AlertInfoProps {
  message: string;
}

const AlertInfo = React.memo<AlertInfoProps>(function AlertInfo({ message }) {
  return (
    <BaseAlert isIn={!!message} severity="info">
      {message}
    </BaseAlert>
  );
});

export default AlertInfo;
