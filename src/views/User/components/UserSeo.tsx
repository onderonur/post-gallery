import React from 'react';
import { gql } from '@apollo/client';
import { NextSeo } from 'next-seo';
import { UserSeo_UserFragment } from '@src/generated/graphql';
import { appTitle } from '@src/utils/appTitle';
import { OpenGraphImages } from 'next-seo/lib/types';

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

const UserSeo = React.memo<UserSeoProps>(function UserSeo({ user }) {
  const images: OpenGraphImages[] = [];
  if (user.thumbnailUrl) {
    images.push({ url: user.thumbnailUrl });
  }
  return (
    <NextSeo
      title={user.displayName}
      description={`${user.displayName} - Profile Page of ${appTitle}`}
      openGraph={{
        images,
      }}
    />
  );
});

export default UserSeo;
