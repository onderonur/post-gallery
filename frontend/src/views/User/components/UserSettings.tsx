import React, { useMemo, useCallback } from "react";
import { Formik, Form } from "formik";
import BaseTextField from "@/components/BaseTextField";
import gql from "graphql-tag";
import {
  UserSettings_UserFragment,
  useUpdateUserMutation,
} from "@/generated/graphql";
import BaseFormActions from "@/components/BaseFormActions";
import { OnSubmit } from "@/types";
import * as Yup from "yup";
import { Container } from "@material-ui/core";
import { trimString } from "@/utils";

interface UserSettingsFormValues {
  displayName: string;
  email: string;
}

const VALIDATION_SCHEMA = Yup.object().shape<UserSettingsFormValues>({
  displayName: Yup.string()
    .label("Display Name")
    .transform(trimString)
    .required(),
  email: Yup.string().label("E-mail").required(),
});

export const UserSettingsFragments = {
  user: gql`
    fragment UserSettings_user on User {
      id
      displayName
      email
    }
  `,
};

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...UserSettings_user
    }
  }
  ${UserSettingsFragments.user}
`;

interface UserSettingsProps {
  user: UserSettings_UserFragment;
}

const UserSettings = React.memo<UserSettingsProps>(({ user }) => {
  const [updateUser] = useUpdateUserMutation({ mutation: UPDATE_USER });

  const initialValues = useMemo(
    () => ({ displayName: user.displayName, email: user.email }),
    [user.displayName, user.email],
  );

  const handleSubmit = useCallback<OnSubmit<UserSettingsFormValues>>(
    async (values, formikHelpers) => {
      const input = { ...values, id: user.id };
      await updateUser({ variables: { input } });
      formikHelpers.setSubmitting(false);
      formikHelpers.resetForm();
    },
    [updateUser, user.id],
  );

  return (
    <Container maxWidth="sm">
      <Formik<UserSettingsFormValues>
        initialValues={initialValues}
        validationSchema={VALIDATION_SCHEMA}
        validateOnMount
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form noValidate autoComplete="off">
              <BaseTextField
                name="displayName"
                label="Display Name"
                required
                fullWidth
                autoFocus
                margin="normal"
              />
              <BaseTextField
                name="email"
                label="E-mail"
                required
                fullWidth
                disabled
                margin="normal"
              />
              <BaseFormActions />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
});

export default UserSettings;
