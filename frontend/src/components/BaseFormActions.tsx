import React from "react";
import FlexRow from "./FlexRow";
import BaseButton from "./BaseButton";
import { useFormikContext } from "formik";
import { makeStyles } from "@material-ui/core";

interface BaseFormActionsProps {
  submitText?: string;
}

const useStyles = makeStyles((theme) => ({
  actionButton: {
    marginRight: theme.spacing(1),
  },
}));

const BaseFormActions: React.FC<BaseFormActionsProps> = ({
  submitText = "Submit",
}) => {
  const classes = useStyles();
  const { isSubmitting, isValid } = useFormikContext();
  return (
    <FlexRow justifyContent="flex-end">
      <BaseButton
        className={classes.actionButton}
        type="reset"
        variant="text"
        color="secondary"
        disabled={isSubmitting}
      >
        Cancel
      </BaseButton>
      <BaseButton
        className={classes.actionButton}
        type="submit"
        color="primary"
        disabled={!isValid}
        loading={isSubmitting}
      >
        {submitText}
      </BaseButton>
    </FlexRow>
  );
};

export default BaseFormActions;
