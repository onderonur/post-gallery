import produce from "immer";
import { isNullOrUndefined } from "util";
import URLS from "@/constants/urls";
import { NextApiResponse } from "next";
import cookie, { CookieSerializeOptions } from "cookie";
import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";

// https://rangle.io/blog/how-to-use-typescript-type-guards/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isOfType = <T>(obj: any, keys: (keyof T)[]): obj is T => {
  for (const key of keys) {
    if (!(key in obj)) {
      return false;
    }
  }
  return true;
};

export const trimString = (str: string) => str.trim();

// TODO: Will specify a generic connection type with a lot of "Maybe<...>" here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateConnectionAfterFetchMore = <T extends any>(
  prevConnection: T,
  moreConnection: T | undefined,
) => {
  if (!moreConnection) {
    return prevConnection;
  }
  const newConnection = produce(prevConnection, (draft) => {
    if (draft.edges) {
      draft.edges.push(...moreConnection.edges);
    }
    if (draft.pageInfo) {
      draft.pageInfo = moreConnection.pageInfo;
    }
    if (!isNullOrUndefined(draft.totalCount)) {
      draft.totalCount = moreConnection.totalCount;
    }
  });
  return newConnection;
};

// TODO: Will specify a generic connection type with a lot of "Maybe<...>" here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addEdgeToConnection = <T extends any>(
  connection: T,
  // TODO:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  edge: any,
) => {
  const newConnection = produce(connection, (draft) => {
    // Inserting the new edge to the beginning of the connection
    connection.edges.unshift(edge);
    connection.totalCount++;
  });

  return newConnection;
};

export const isServer = () => typeof window === "undefined";

export const extractAuthToken = (cookies: NextApiRequestCookies) => {
  return cookies[authTokenCookieName];
};

export const authHeaderKey = "Authorization";

export const getAuthHeaderValue = (authToken: string) => {
  return `Bearer ${authToken}`;
};

export const redirectToHome = (logoutTimeStamp?: string) => {
  let href = URLS.posts;
  if (logoutTimeStamp) {
    href = `${href}?logout=${logoutTimeStamp}`;
  }
  window.location.href = href;
};

export const convertYearsToSeconds = (years: number) => {
  const oneYearAsSeconds = 60 * 60 * 24 * 365;
  return oneYearAsSeconds * years;
};

const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: cookie.CookieSerializeOptions,
) => {
  const currentCookies = res.getHeader("Set-Cookie") || [];
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
  res.setHeader("Set-Cookie", finalCookies);
};

export const safeCookieOptions: CookieSerializeOptions = {
  // We need to set "path". Otherwise, the cookie will be
  // set for "/api" path.
  path: "/",
  // Cookie life-time: 5 years
  maxAge: convertYearsToSeconds(5),
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
};

const authTokenCookieName = "authToken";

export const setAuthTokenCookie = (res: NextApiResponse, authToken: string) => {
  setCookie(res, authTokenCookieName, authToken, safeCookieOptions);
};

export const destroyAuthTokenCookie = (res: NextApiResponse) => {
  setCookie(res, authTokenCookieName, "", {
    // We need to set "path". Otherwise, the cookie will be
    // set for "/api" path.
    path: "/",
    maxAge: -1,
  });
};

export const dateTimeFormat = "DD-MM-YYYY HH:mm";

class CustomError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message); // 'Error' breaks prototype chain here
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

// https://github.com/zeit/micro#error-handling
export const createError = (statusCode: number, message: string) => {
  const err = new CustomError(statusCode, message);
  return err;
};
