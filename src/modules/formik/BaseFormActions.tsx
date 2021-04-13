import React from 'react';
import BaseButton from '@src/modules/shared/BaseButton';
import { useFormikContext } from 'formik';
import { BoxProps } from '@material-ui/core';
import Stack from '@src/modules/shared/Stack';

type BaseFormActionsProps = BoxProps & {
  submitText?: string;
};

const BaseFormActions = React.memo<BaseFormActionsProps>(
  function BaseFormActions({ submitText = 'Submit', ...rest }) {
    const { isSubmitting, isValid, dirty } = useFormikContext();
    return (
      <Stack
        spacing={1}
        flexDirection="row"
        justifyContent="flex-end"
        marginY={1}
        {...rest}
      >
        <BaseButton
          type="reset"
          variant="text"
          color="secondary"
          disabled={isSubmitting}
        >
          Cancel
        </BaseButton>
        <BaseButton
          type="submit"
          color="primary"
          disabled={!isValid || !dirty}
          loading={isSubmitting}
        >
          {submitText}
        </BaseButton>
      </Stack>
    );
  },
);

export default BaseFormActions;
