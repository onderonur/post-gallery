import produce from "immer";
import { isNullOrUndefined } from "util";
import { Maybe } from "@/generated/graphql";
import URLS from "@/constants/urls";
import { NextApiResponse } from "next";
import cookie from "cookie";
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
  return cookies.authToken;
};

export const addAuthHeader = (
  headers: Record<string, string>,
  authToken: Maybe<string>,
) => {
  if (!authToken) {
    return headers;
  }
  return {
    ...headers,
    Authorization: `Bearer ${authToken}`,
  };
};

export const redirectToHome = (logoutTimeStamp?: string) => {
  let href = URLS.posts;
  if (logoutTimeStamp) {
    href = `${href}?logout=${logoutTimeStamp}`;
  }
  window.location.href = href;
};

const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: cookie.CookieSerializeOptions,
) => {
  res.setHeader("Set-Cookie", cookie.serialize(name, value, options));
};

export const setAuthTokenCookie = (res: NextApiResponse, authToken: string) => {
  setCookie(res, "authToken", authToken, {
    path: "/",
    maxAge: convertYearsToSeconds(5),
    httpOnly: true,
    // We need to set "path". Otherwise, the cookie will be
    // set for "/api" path.
    sameSite: "strict",
    // Cookie life-time: 5 years
    secure: process.env.NODE_ENV === "production",
  });
};

export const destroyAuthTokenCookie = (res: NextApiResponse) => {
  setCookie(res, "authToken", "", {
    // We need to set "path". Otherwise, the cookie will be
    // set for "/api" path.
    path: "/",
    maxAge: -1,
  });
};

export const convertYearsToSeconds = (years: number) => {
  const oneYearAsSeconds = 60 * 60 * 24 * 365;
  return oneYearAsSeconds * years;
};
