import { CookieSerializeOptions } from 'cookie';
import { isDev } from './isDev';

const convertYearsToSeconds = (years: number) => {
  const oneYearAsSeconds = 60 * 60 * 24 * 365;
  return oneYearAsSeconds * years;
};

export const SAFE_COOKIE_OPTIONS: CookieSerializeOptions = {
  // We need to set "path". Otherwise, the cookie will be
  // set for "/api" path.
  path: '/',
  // Cookie life-time: 5 years
  maxAge: convertYearsToSeconds(5),
  httpOnly: true,
  sameSite: 'strict',
  secure: !isDev(),
};
