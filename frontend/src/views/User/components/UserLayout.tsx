import React from "react";
import { Tabs, Tab, Paper, Box } from "@material-ui/core";
import gql from "graphql-tag";
import {
  UserLayout_UserFragment,
  UserLayout_UserPostsFragment,
  Maybe,
} from "@/generated/graphql";
import useRequireOwner from "@/hooks/useRequireOwner";
import UserHeader, { UserHeaderFragments } from "./UserHeader";
import UserSeo, { UserSeoFragments } from "./UserSeo";
import { useRouter } from "next/router";
import NextLink from "@/components/NextLink";

export const UserLayoutFragments = {
  user: gql`
    fragment UserLayout_user on User {
      ...UserSeo_user
      ...UserHeader_user
    }
    ${UserSeoFragments.user}
    ${UserHeaderFragments.user}
  `,
  userPosts: gql`
    fragment UserLayout_userPosts on PostConnection {
      totalCount
    }
  `,
};

interface UserLayoutProps {
  user: Maybe<UserLayout_UserFragment>;
  userPosts: Maybe<UserLayout_UserPostsFragment>;
}

const UserLayout: React.FC<UserLayoutProps> = ({
  user,
  userPosts,
  children,
}) => {
  const requireOwner = useRequireOwner(user?.id);
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <>
      <UserSeo user={user} />
      <UserHeader user={user} />
      <Paper>
        <Tabs
          value={router.pathname}
          indicatorColor="primary"
          textColor="primary"
          aria-label="user profile tabs"
        >
          <Tab
            label={`Posts (${userPosts?.totalCount || 0})`}
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
      </Paper>
      <Box padding={2}>{children}</Box>
    </>
  );
};

export default UserLayout;
