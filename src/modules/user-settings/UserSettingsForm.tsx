import React, { useMemo, useCallback } from 'react';
import { Formik, Form } from 'formik';
import BaseTextField from '@src/modules/formik/BaseTextField';
import { gql } from '@apollo/client';
import {
  useUpdateUserMutation,
  UserInput,
  UserSettingsForm_UserFragment,
} from '@src/generated/graphql';
import BaseFormActions from '@src/modules/formik/BaseFormActions';
import { OnSubmitFn } from '@src/modules/shared/SharedTypes';
import * as Yup from 'yup';
import { Box } from '@material-ui/core';
import Stack from '@src/modules/shared/Stack';
import { goTry } from 'go-try';

const validationSchema: Yup.SchemaOf<UserInput> = Yup.object({
  displayName: Yup.string()
    .label('Display Name')
    .trim()
    .required()
    .min(3)
    .max(50),
  email: Yup.string().label('E-mail').trim().required().email().min(3).max(320),
});

export const UserSettingsFormFragments = {
  user: gql`
    fragment UserSettingsForm_user on User {
      id
      displayName
      email
    }
  `,
};

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserSettingsForm_user
    }
  }
  ${UserSettingsFormFragments.user}
`;

interface UserSettingsFormProps {
  user: UserSettingsForm_UserFragment;
}

function UserSettingsForm({ user }: UserSettingsFormProps) {
  const [updateUser] = useUpdateUserMutation({
    mutation: UPDATE_USER,
  });

  const initialValues = useMemo<UserInput>(
    () => ({
      displayName: user?.displayName ?? '',
      email: user?.email ?? '',
    }),
    [user],
  );

  const handleSubmit = useCallback<OnSubmitFn<UserInput>>(
    async (values) => {
      if (!user) {
        return;
      }
      await goTry(() =>
        updateUser({
          variables: { id: user.id, input: values },
        }),
      );
    },
    [updateUser, user],
  );

  return (
    <Formik<UserInput>
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form noValidate autoComplete="off">
        <Box marginY={2}>
          <Stack spacing={3} flexDirection="column">
            <BaseTextField
              name="displayName"
              label="Display Name"
              required
              autoFocus
            />
            <BaseTextField name="email" label="E-mail" required />
          </Stack>
          <BaseFormActions />
        </Box>
      </Form>
    </Formik>
  );
}

export default UserSettingsForm;
