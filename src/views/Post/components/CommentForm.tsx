import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BaseTextField from '@src/components/BaseTextField';
import BaseFormActions from '@src/components/BaseFormActions';
import Loading from '@src/components/Loading';
import BaseLink from '@src/components/BaseLink';
import urls from '@src/utils/urls';
import useRequireAuth from '@src/hooks/useRequireAuth';
import { Typography } from '@material-ui/core';
import { OnSubmitFn } from '@src/types';

interface CommentFormValues {
  text: string;
}

interface CommentFormProps {
  onSubmit: OnSubmitFn<CommentFormValues>;
}

const CommentFormFallback = () => {
  return (
    <Typography>
      Please <BaseLink href={urls.login.href}>log in</BaseLink> to comment this
      post.
    </Typography>
  );
};

const initialValues: CommentFormValues = { text: '' };

const validationSchema = Yup.object().shape<CommentFormValues>({
  text: Yup.string().trim().required(),
});

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
