import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BaseTextField from '@src/modules/formik/BaseTextField';
import BaseFormActions from '@src/modules/formik/BaseFormActions';
import Loading from '@src/modules/shared/Loading';
import BaseLink from '@src/modules/routing/BaseLink';
import { urls } from '@src/modules/routing/RoutingUtils';
import { useRequireAuth } from '@src/modules/auth/AuthHooks';
import { Typography } from '@material-ui/core';
import { OnSubmitFn } from '@src/modules/shared/SharedTypes';

interface CommentFormValues {
  text: string;
}

interface CommentFormProps {
  onSubmit: OnSubmitFn<CommentFormValues>;
}

const CommentFormFallback = () => {
  return (
    <Typography>
      Please <BaseLink href={urls.login()}>log in</BaseLink> to comment this
      post.
    </Typography>
  );
};

const validationSchema: Yup.SchemaOf<CommentFormValues> = Yup.object({
  text: Yup.string().trim().required().default(''),
});

const initialValues: CommentFormValues = { text: '' };

const CommentForm = React.memo<CommentFormProps>(function CommentForm({
  onSubmit,
}) {
  const requireAuth = useRequireAuth();
  return requireAuth(
    <Formik<CommentFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => {
        if (isSubmitting) {
          return <Loading />;
        }
        return (
          <Form>
            <BaseTextField
              name="text"
              placeholder="Add a comment..."
              multiline
              // We hide "error" indicators on the comment input
              InputProps={{
                error: false,
              }}
              FormHelperTextProps={{
                error: false,
                hidden: true,
              }}
            />
            <BaseFormActions submitText="Comment" />
          </Form>
        );
      }}
    </Formik>,
    <CommentFormFallback />,
  );
});

export default CommentForm;
