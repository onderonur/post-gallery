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

interface UserSettingsFormValues {
  displayName: string;
}

const VALIDATION_SCHEMA = Yup.object().shape<UserSettingsFormValues>({
  displayName: Yup.string().label("Display Name").required(),
});

export const UserSettingsFragments = {
  user: gql`
    fragment UserSettings_user on User {
      id
      displayName
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

  const initialValues = useMemo(() => ({ displayName: user.displayName }), [
    user.displayName,
  ]);

  const handleSubmit = useCallback<OnSubmit<UserSettingsFormValues>>(
    async (values, formikHelpers) => {
      const input = { ...values, id: user.id };
      await updateUser({ variables: { input } });
      formikHelpers.setSubmitting(false);
    },
    [updateUser, user.id],
  );

  return (
    <Container maxWidth="sm">
      <Formik<UserSettingsFormValues>
        initialValues={initialValues}
        validationSchema={VALIDATION_SCHEMA}
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
