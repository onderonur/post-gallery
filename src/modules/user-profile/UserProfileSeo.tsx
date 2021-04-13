import React from 'react';
import { gql } from '@apollo/client';
import { NextSeo } from 'next-seo';
import { UserProfileSeo_UserFragment } from '@src/generated/graphql';
import { APP_TITLE } from '@src/modules/shared/SharedUtils';
import { OpenGraphImages } from 'next-seo/lib/types';

export const UserProfileSeoFragments = {
  user: gql`
    fragment UserProfileSeo_user on User {
      id
      displayName
      thumbnailUrl
    }
  `,
};

interface UserProfileSeoProps {
  user: UserProfileSeo_UserFragment;
}

const UserProfileSeo = React.memo<UserProfileSeoProps>(function UserProfileSeo({
  user,
}) {
  const images: OpenGraphImages[] = [];
  if (user.thumbnailUrl) {
    images.push({ url: user.thumbnailUrl });
  }
  return (
    <NextSeo
      title={user.displayName}
      description={`${user.displayName} - Profile Page of ${APP_TITLE}`}
      openGraph={{
        images,
      }}
    />
  );
});

export default UserProfileSeo;
