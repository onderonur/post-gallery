import React from "react";
import FlexRow from "./FlexRow";
import BaseButton from "./BaseButton";
import { useFormikContext } from "formik";
import { makeStyles, BoxProps } from "@material-ui/core";

type BaseFormActionsProps = BoxProps & {
  submitText?: string;
};

const useStyles = makeStyles((theme) => ({
  actionButton: {
    marginRight: theme.spacing(1),
  },
}));

const BaseFormActions = React.memo<BaseFormActionsProps>(
  ({ submitText = "Submit", ...rest }) => {
    const classes = useStyles();
    const { isSubmitting, isValid, dirty } = useFormikContext();
    return (
      <FlexRow justifyContent="flex-end" marginY={1} {...rest}>
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
          disabled={!isValid || !dirty}
          loading={isSubmitting}
        >
          {submitText}
        </BaseButton>
      </FlexRow>
    );
  },
);

export default BaseFormActions;
