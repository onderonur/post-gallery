const URLS = {
  login: "/login",
  user: "/users/:userId",
  post: "/posts/:postId",
  posts: "/posts",
};

export const setUrlParams = (url: string, params: Record<string, string>) => {
  let formattedUrl = url;
  const keys = Object.keys(params);
  for (const key of keys) {
    formattedUrl = formattedUrl.replace(`:${key}`, params[key]);
  }
  return formattedUrl;
};

export default URLS;
