import { ID } from '@src/types';

export const urls = {
  home: {
    href: '/',
  },
  login: {
    href: '/login',
  },
  categoryPosts: {
    href: `/[categorySlug]`,
    as: (categorySlug: string) => `/${categorySlug}`,
  },
  post: {
    href: '/posts/[postId]',
    as: (postId: ID) => `/posts/${postId}`,
  },
  userProfile: {
    href: '/users/[userId]',
    as: (userId: ID) => `/users/${userId}`,
  },
  userProfileSettings: {
    href: '/users/[userId]/settings',
    as: (userId: ID) => `/users/${userId}/settings`,
  },
  userProfileSessions: {
    href: '/users/[userId]/sessions',
    as: (userId: ID) => `/users/${userId}/sessions`,
  },
};

export const redirectToHome = (logoutTimeStamp?: string) => {
  let href = urls.home.href;
  if (logoutTimeStamp) {
    href = `${href}?logout=${logoutTimeStamp}`;
  }
  window.location.href = href;
};
