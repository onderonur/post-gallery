import React from 'react';
import { gql } from '@apollo/client';
import { useGetUserQuery } from '@src/generated/graphql';
import { ID } from '@src/modules/shared/SharedTypes';
import { Container, Divider } from '@material-ui/core';
import UserProfileLayout, {
  UserProfileLayoutFragments,
} from '@src/modules/user-profile//UserProfileLayout';
import { useRouter } from 'next/router';
import Loading from '@src/modules/shared/Loading';
import UserSocialAccounts, {
  UserSocialAccountsFragments,
} from '@src/modules/user-settings/UserSocialAccounts';
import UserSettingsForm, {
  UserSettingsFormFragments,
} from '@src/modules/user-settings/UserSettingsForm';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserProfileLayout_user
      ...UserSettingsForm_user
      ...UserSocialAccounts_user
    }
  }
  ${UserProfileLayoutFragments.user}
  ${UserSettingsFormFragments.user}
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

  const user = data?.user;

  return (
    <UserProfileLayout user={user}>
      {loading ? (
        <Loading />
      ) : (
        user && (
          <Container maxWidth="sm">
            <UserSettingsForm user={user} />
            <Divider />
            <UserSocialAccounts user={user} />
          </Container>
        )
      )}
    </UserProfileLayout>
  );
}

export default UserSettingsView;
