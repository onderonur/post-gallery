import React from "react";
import gql from "graphql-tag";
import { NextSeo } from "next-seo";
import { UserSeo_UserFragment } from "@/generated/graphql";

export const UserSeoFragments = {
  user: gql`
    fragment UserSeo_user on User {
      id
      displayName
      thumbnailUrl
    }
  `,
};

interface UserSeoProps {
  user: UserSeo_UserFragment;
}

const UserSeo = React.memo<UserSeoProps>(({ user }) => {
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

export default UserSeo;
