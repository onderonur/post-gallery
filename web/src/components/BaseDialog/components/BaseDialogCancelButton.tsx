import React from "react";
import BaseButton from "components/BaseButton";
import { useBaseDialogContext } from "components/BaseDialog";

const BaseDialogCancelButton = () => {
  const { onClose } = useBaseDialogContext();
  return (
    <BaseButton variant="text" color="secondary" onClick={onClose}>
      Cancel
    </BaseButton>
  );
};

export default BaseDialogCancelButton;
