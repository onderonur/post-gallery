import { ID } from '@src/types';

const urls = {
  home: {
    href: '/',
  },
  login: {
    href: '/login',
  },
  user: {
    href: '/users/[userId]',
    as: (userId: ID) => `/users/${userId}`,
  },
  post: {
    href: '/posts/[postId]',
    as: (postId: ID) => `/posts/${postId}`,
  },
  categoryPosts: {
    href: `/[categorySlug]`,
    as: (categorySlug: string) => `/${categorySlug}`,
  },
};

export default urls;
