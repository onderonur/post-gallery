import React from 'react';
import BaseButton from '@src/components/BaseButton';
import { useBaseDialogContext } from '../contexts/BaseDialogContext';

const BaseDialogCancelButton = React.memo(function BaseDialogCancelButton() {
  const { onClose } = useBaseDialogContext();
  return (
    <BaseButton variant="text" color="secondary" onClick={onClose}>
      Cancel
    </BaseButton>
  );
});

export default BaseDialogCancelButton;
