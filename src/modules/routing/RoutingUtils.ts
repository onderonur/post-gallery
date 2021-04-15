import { ID } from '@src/modules/shared/SharedTypes';

export const urls = {
  home: () => '/',
  login: () => '/login',
  categoryPosts: (categorySlug: string) => `/${categorySlug}`,
  post: (postId: ID) => `/posts/${postId}`,
  userProfile: (userId: ID) => `/users/${userId}`,
  userProfileSettings: (userId: ID) => `/users/${userId}/settings`,
  userProfileSessions: (userId: ID) => `/users/${userId}/sessions`,
};

export const redirectToHome = (logoutTimeStamp?: string) => {
  let href = urls.home();
  if (logoutTimeStamp) {
    href = `${href}?logout=${logoutTimeStamp}`;
  }
  window.location.href = href;
};
