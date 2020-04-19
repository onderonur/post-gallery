import React from "react";
import FlexRow from "./FlexRow";
import styled from "styled-components";
import BaseButton from "./BaseButton";
import { useFormikContext } from "formik";

interface BaseFormActionsProps {
  submitText?: string;
}

const FormActionButton = styled(BaseButton)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
` as typeof BaseButton;

const BaseFormActions: React.FC<BaseFormActionsProps> = ({
  submitText = "Submit",
}) => {
  const { isSubmitting, isValid } = useFormikContext();
  return (
    <FlexRow justifyContent="flex-end">
      <FormActionButton
        type="reset"
        variant="text"
        color="secondary"
        disabled={isSubmitting}
      >
        Cancel
      </FormActionButton>
      <FormActionButton
        type="submit"
        color="primary"
        disabled={!isValid}
        loading={isSubmitting}
      >
        {submitText}
      </FormActionButton>
    </FlexRow>
  );
};

export default BaseFormActions;
