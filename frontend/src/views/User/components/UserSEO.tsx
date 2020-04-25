import React from "react";
import gql from "graphql-tag";
import { NextSeo } from "next-seo";
import { UserSeo_UserFragment } from "@/generated/graphql";

export const UserSEOFragments = {
  user: gql`
    fragment UserSEO_user on User {
      id
      displayName
      thumbnailUrl
    }
  `,
};

interface UserSEOProps {
  user: UserSeo_UserFragment;
}

const UserSEO = React.memo<UserSEOProps>(({ user }) => {
  return (
    <NextSeo
      title={user.displayName}
      description={`${user.displayName} - Profile Page of Post Gallery`}
      openGraph={{
        images: [{ url: user.thumbnailUrl || "" }],
      }}
    />
  );
});

export default UserSEO;
