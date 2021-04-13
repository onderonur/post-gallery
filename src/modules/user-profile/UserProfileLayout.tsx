import React from 'react';
import { Tabs, Tab, Box } from '@material-ui/core';
import { gql } from '@apollo/client';
import { UserProfileLayout_UserFragment, Maybe } from '@src/generated/graphql';
import { useRequireOwner } from '@src/modules/auth/AuthHooks';
import UserProfileHeader, {
  UserProfileHeaderFragments,
} from './UserProfileHeader';
import { useRouter } from 'next/router';
import NextLink from '@src/modules/routing/NextLink';
import UserProfileSeo, { UserProfileSeoFragments } from './UserProfileSeo';
import BasePaper from '@src/modules/shared/BasePaper';
import { urls } from '@src/modules/routing/RoutingUtils';

export const UserProfileLayoutFragments = {
  user: gql`
    fragment UserProfileLayout_user on User {
      ...UserProfileSeo_user
      ...UserProfileHeader_user
      postsCount
    }
    ${UserProfileSeoFragments.user}
    ${UserProfileHeaderFragments.user}
  `,
};

interface UserProfileLayoutProps {
  user: Maybe<UserProfileLayout_UserFragment>;
}

const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({
  user,
  children,
}) => {
  const requireOwner = useRequireOwner(user?.id);
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <>
      <UserProfileSeo user={user} />
      <UserProfileHeader user={user} />
      <BasePaper>
        <Tabs
          value={router.pathname}
          indicatorColor="primary"
          textColor="primary"
          aria-label="user profile tabs"
        >
          <Tab
            label={`Posts (${user.postsCount})`}
            value={urls.userProfile.href}
            href={urls.userProfile.href}
            hrefAs={urls.userProfile.as(user.id)}
            component={NextLink}
          />
          {requireOwner(
            <Tab
              label="Settings"
              value={urls.userProfileSettings.href}
              href={urls.userProfileSettings.href}
              hrefAs={urls.userProfileSettings.as(user.id)}
              component={NextLink}
            />,
          )}
          {requireOwner(
            <Tab
              label="Sessions"
              value={urls.userProfileSessions.href}
              href={urls.userProfileSessions.href}
              hrefAs={urls.userProfileSessions.as(user.id)}
              component={NextLink}
            />,
          )}
        </Tabs>
      </BasePaper>
      <Box padding={2}>{children}</Box>
    </>
  );
};

export default UserProfileLayout;
