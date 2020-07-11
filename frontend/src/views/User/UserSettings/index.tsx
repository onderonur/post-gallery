import React, { useMemo, useCallback } from "react";
import { Formik, Form } from "formik";
import BaseTextField from "@/components/BaseTextField";
import gql from "graphql-tag";
import {
  UserSettings_UserFragment,
  useUpdateUserMutation,
  useGetUserQuery,
} from "@/generated/graphql";
import BaseFormActions from "@/components/BaseFormActions";
import { OnSubmit, ID } from "@/types";
import * as Yup from "yup";
import { Container } from "@material-ui/core";
import { trimString } from "@/utils";
import UserLayout, { UserLayoutFragments } from "../components/UserLayout";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

interface UserSettingsFormValues {
  displayName: string;
  email: string;
}

const validationSchema = Yup.object().shape<UserSettingsFormValues>({
  displayName: Yup.string()
    .label("Display Name")
    .transform(trimString)
    .required(),
  email: Yup.string().label("E-mail").required(),
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
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
      posts(first: 0) @connection(key: "userPosts") {
        ...UserLayout_userPosts
      }
    }
  }
  ${UserLayoutFragments.user}
  ${UserSettingsFragments.user}
  ${UserLayoutFragments.userPosts}
`;

interface UserSettingsProps {
  user: UserSettings_UserFragment;
}

const UserSettingsView = React.memo<UserSettingsProps>(() => {
  const router = useRouter();
  const { userId } = router.query;
  const { data, loading } = useGetUserQuery({
    query: GET_USER,
    variables: { id: userId as ID },
  });

  const [updateUser] = useUpdateUserMutation({ mutation: UPDATE_USER });

  const user = data?.user;

  const initialValues = useMemo<UserSettingsFormValues>(
    () => ({ displayName: user?.displayName || "", email: user?.email || "" }),
    [user],
  );

  const handleSubmit = useCallback<OnSubmit<UserSettingsFormValues>>(
    async (values, formikHelpers) => {
      if (!user) {
        return;
      }
      const input = { ...values, id: user.id };
      await updateUser({ variables: { input } });
      formikHelpers.setSubmitting(false);
      formikHelpers.resetForm();
    },
    [updateUser, user],
  );

  return (
    <UserLayout user={user} userPosts={user?.posts}>
      {loading ? (
        <Loading />
      ) : (
        <Container maxWidth="sm">
          <Formik<UserSettingsFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
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
      )}
    </UserLayout>
  );
});

export default UserSettingsView;
