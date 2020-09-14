import React, { useMemo, useCallback } from 'react';
import { Formik, Form } from 'formik';
import BaseTextField from '@src/components/BaseTextField';
import { gql } from '@apollo/client';
import {
  useUpdateUserMutation,
  useGetUserQuery,
  UserInput,
} from '@src/generated/graphql';
import BaseFormActions from '@src/components/BaseFormActions';
import { OnSubmitFn, ID } from '@src/types';
import * as Yup from 'yup';
import { Box, Container, Divider } from '@material-ui/core';
import UserLayout, { UserLayoutFragments } from '../../components/UserLayout';
import { useRouter } from 'next/router';
import Loading from '@src/components/Loading';
import UserSocialAccounts, {
  UserSocialAccountsFragments,
} from './components/UserSocialAccounts';
import Stack from '@src/components/Stack';
import { to } from '@shared/to';

const validationSchema = Yup.object().shape<UserInput>({
  displayName: Yup.string()
    .label('Display Name')
    .trim()
    .required()
    .min(3)
    .max(50),
  email: Yup.string().label('E-mail').trim().required().email().min(3).max(320),
});

const UserSettingsFragments = {
  user: gql`
    fragment UserSettings_user on User {
      id
      displayName
      email
    }
  `,
};

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserSettings_user
    }
  }
  ${UserSettingsFragments.user}
`;

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserLayout_user
      ...UserSettings_user
      ...UserSocialAccounts_user
    }
  }
  ${UserLayoutFragments.user}
  ${UserSettingsFragments.user}
  ${UserSocialAccountsFragments.user}
`;

function UserSettingsView() {
  const router = useRouter();
  const { userId } = router.query;
  const { data, loading } = useGetUserQuery({
    query: GET_USER,
    variables: { id: userId as ID },
    returnPartialData: true,
  });

  const [updateUser] = useUpdateUserMutation({
    mutation: UPDATE_USER,
  });

  const user = data?.user;

  const initialValues = useMemo<UserInput>(
    () => ({
      displayName: user?.displayName || '',
      email: user?.email || '',
    }),
    [user],
  );

  const handleSubmit = useCallback<OnSubmitFn<UserInput>>(
    async (values, formikHelpers) => {
      if (!user) {
        return;
      }
      const { error } = await to(
        updateUser({
          variables: { id: user.id, input: values },
        }),
      );
      if (error) {
        return;
      }
      formikHelpers.setSubmitting(false);
    },
    [updateUser, user],
  );

  return (
    <UserLayout user={user}>
      {loading ? (
        <Loading />
      ) : (
        <Container maxWidth="sm">
          <Formik<UserInput>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => {
              return (
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
              );
            }}
          </Formik>
          <Divider />
          {user && <UserSocialAccounts user={user} />}
        </Container>
      )}
    </UserLayout>
  );
}

export default UserSettingsView;
