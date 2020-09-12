import React from 'react';
import { Tabs, Tab, Box } from '@material-ui/core';
import { gql } from '@apollo/client';
import { UserLayout_UserFragment, Maybe } from '@src/generated/graphql';
import useRequireOwner from '@src/hooks/useRequireOwner';
import UserHeader, { UserHeaderFragments } from './UserHeader';
import { useRouter } from 'next/router';
import NextLink from '@src/components/NextLink';
import UserSeo, { UserSeoFragments } from './UserSeo';
import BasePaper from '@src/components/BasePaper';

export const UserLayoutFragments = {
  user: gql`
    fragment UserLayout_user on User {
      ...UserSeo_user
      ...UserHeader_user
      postsCount
    }
    ${UserSeoFragments.user}
    ${UserHeaderFragments.user}
  `,
};

interface UserLayoutProps {
  user: Maybe<UserLayout_UserFragment>;
}

const UserLayout: React.FC<UserLayoutProps> = ({ user, children }) => {
  const requireOwner = useRequireOwner(user?.id);
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <>
      <UserSeo user={user} />
      <UserHeader user={user} />
      <BasePaper>
        <Tabs
          value={router.pathname}
          indicatorColor="primary"
          textColor="primary"
          aria-label="user profile tabs"
        >
          <Tab
            label={`Posts (${user.postsCount})`}
            value="/users/[userId]"
            href="/users/[userId]"
            hrefAs={`/users/${user.id}`}
            component={NextLink}
          />
          {requireOwner(
            <Tab
              label="Settings"
              value="/users/[userId]/settings"
              href="/users/[userId]/settings"
              hrefAs={`/users/${user.id}/settings`}
              component={NextLink}
            />,
          )}
          {requireOwner(
            <Tab
              label="Sessions"
              value="/users/[userId]/sessions"
              href="/users/[userId]/sessions"
              hrefAs={`/users/${user.id}/sessions`}
              component={NextLink}
            />,
          )}
        </Tabs>
      </BasePaper>
      <Box padding={2}>{children}</Box>
    </>
  );
};

export default UserLayout;
