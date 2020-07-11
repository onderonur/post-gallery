import React from "react";
import { Formik, Form, FormikConfig } from "formik";
import * as Yup from "yup";
import BaseTextField from "@/components/BaseTextField";
import BaseFormActions from "@/components/BaseFormActions";
import Loading from "@/components/Loading";
import { trimString } from "@/utils";
import { Typography } from "@material-ui/core";
import BaseLink from "@/components/BaseLink";
import URLS from "@/constants/urls";
import useRequireAuth from "@/hooks/useRequireAuth";

interface CommentFormValues {
  text: string;
}

interface CommentFormProps {
  onSubmit: FormikConfig<CommentFormValues>["onSubmit"];
}

const CommentFormFallback = () => {
  return (
    <Typography>
      Please <BaseLink href={URLS.login}>login</BaseLink> to comment this post.
    </Typography>
  );
};

const initialValues: CommentFormValues = { text: "" };

const validationSchema = Yup.object().shape<CommentFormValues>({
  text: Yup.string().transform(trimString).required(),
});

const CommentForm = React.memo<CommentFormProps>(({ onSubmit }) => {
  const requireAuth = useRequireAuth();
  return requireAuth(
    <Formik<CommentFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
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
              fullWidth
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
