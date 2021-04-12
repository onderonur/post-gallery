import { NextApiResponse } from 'next';
import cookie, { CookieSerializeOptions } from 'cookie';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';
import { SAFE_COOKIE_OPTIONS } from '../../shared/safeCookieOptions';

const authTokenCookieName = 'authToken';

export const extractAuthToken = (cookies: NextApiRequestCookies) => {
  return cookies[authTokenCookieName];
};

export const getAuthHeaderValue = (authToken: string) => {
  return `Bearer ${authToken}`;
};

const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: CookieSerializeOptions,
) => {
  const currentCookies = res.getHeader('Set-Cookie') || [];
  const serializedCookie = cookie.serialize(name, value, options);
  let finalCookies;
  if (currentCookies) {
    if (Array.isArray(currentCookies)) {
      finalCookies = [...currentCookies, serializedCookie];
    } else {
      finalCookies = [currentCookies, serializedCookie];
    }
  } else {
    finalCookies = [serializedCookie];
  }
  finalCookies = finalCookies.map((v) => v.toString());
  res.setHeader('Set-Cookie', finalCookies);
};

export const setAuthTokenCookie = (res: NextApiResponse, authToken: string) => {
  setCookie(res, authTokenCookieName, authToken, SAFE_COOKIE_OPTIONS);
};

export const destroyAuthTokenCookie = (res: NextApiResponse) => {
  setCookie(res, authTokenCookieName, '', {
    // We need to set "path". Otherwise, the cookie will be
    // set for "/api" path.
    path: '/',
    maxAge: -1,
  });
};
