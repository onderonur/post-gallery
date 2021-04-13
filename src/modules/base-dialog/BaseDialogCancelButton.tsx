import React from 'react';
import BaseButton from '@src/modules/shared/BaseButton';
import { useBaseDialogContext } from './BaseDialogContext';

const BaseDialogCancelButton = React.memo(function BaseDialogCancelButton() {
  const { onClose } = useBaseDialogContext();
  return (
    <BaseButton variant="text" color="secondary" onClick={onClose}>
      Cancel
    </BaseButton>
  );
});

export default BaseDialogCancelButton;
