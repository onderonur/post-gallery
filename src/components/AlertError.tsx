import React, { useCallback, useEffect, useState } from 'react';
import { Maybe } from '@src/generated/graphql';
import BaseAlert from './BaseAlert';

interface AlertErrorProps {
  error: Maybe<Error>;
}

const AlertError = React.memo<AlertErrorProps>(function AlertError({ error }) {
  const [isIn, setIsIn] = useState<boolean>(!!error);

  useEffect(() => {
    setIsIn(!!error);
  }, [error]);

  const handleClose = useCallback(() => {
    setIsIn(false);
  }, []);

  return (
    <BaseAlert isIn={isIn} severity="error" onClose={handleClose}>
      {error?.message}
    </BaseAlert>
  );
});

export default AlertError;
