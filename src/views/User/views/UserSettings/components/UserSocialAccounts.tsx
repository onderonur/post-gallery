import { gql } from '@apollo/client';
import { Box, Typography } from '@material-ui/core';
import Stack from '@src/components/Stack';
import { Bold } from '@src/components/Utils';
import {
  SocialAccountType,
  UserSocialAccounts_UserFragment,
} from '@src/generated/graphql';
import React from 'react';
import UserSocialAccountLinker, {
  UserSocialAccountLinkerFragments,
} from './UserSocialAccountLinker';

export const UserSocialAccountsFragments = {
  user: gql`
    fragment UserSocialAccounts_user on User {
      ...UserSocialAccountLinker_user
    }
    ${UserSocialAccountLinkerFragments.user}
  `,
};

interface UserSocialAccountsProps {
  user: UserSocialAccounts_UserFragment;
}

const UserSocialAccounts = React.memo<UserSocialAccountsProps>(
  function UserSocialAccounts({ user }) {
    return (
      <Box paddingY={1}>
        <Typography variant="subtitle1" component="h2">
          <Bold>Social Accounts</Bold>
        </Typography>
        <Stack spacing={1} flexDirection="column">
          <UserSocialAccountLinker
            user={user}
            socialAccountType={SocialAccountType.Google}
          />
          <UserSocialAccountLinker
            user={user}
            socialAccountType={SocialAccountType.Facebook}
          />
        </Stack>
      </Box>
    );
  },
);

export default UserSocialAccounts;
