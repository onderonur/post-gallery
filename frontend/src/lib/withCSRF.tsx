import React from "react";
import nookies from "nookies";
import { AppProps, AppContext } from "next/app";
import { NextPageContext } from "next";
import { Maybe } from "@/generated/graphql";
import { isServer, SAFE_COOKIE_OPTIONS } from "@/utils";
import Tokens from "csrf";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __NEXT_DATA__: any;
  }
}

declare module "http" {
  interface ServerResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locals: {
      csrfToken: string;
    };
  }
}

const CSRF_SECRET_KEY = "_csrf";
export const CSRF_TOKEN_HEADER_KEY = "x-xsrf-token";

export const getCSRFToken = (ctx?: NextPageContext) => {
  return isServer()
    ? ctx?.res?.locals.csrfToken
    : window.__NEXT_DATA__.props.csrfToken;
};

// TODO: Will fix this "AppComponent" type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withCSRF = (AppComponent: any) => {
  const WithCSRF = (props: AppProps) => {
    return <AppComponent {...props} />;
  };
  WithCSRF.getInitialProps = async (
    appContext: NextPageContext & AppContext,
  ) => {
    let csrfToken: Maybe<string>;
    if (isServer() && appContext.ctx.req && appContext.ctx.res) {
      // Get all cookies from the request
      const currentCookies = nookies.get(appContext.ctx);
      // Check if there is a csrfSecret
      let csrfSecret = currentCookies[CSRF_SECRET_KEY];
      const tokens = new Tokens();
      if (!csrfSecret) {
        // If there is no csrfSecret, first create it.
        csrfSecret = tokens.secretSync();
        // Then, set it in a httpOnly cookie for later use.
        nookies.set(
          appContext.ctx,
          CSRF_SECRET_KEY,
          csrfSecret,
          SAFE_COOKIE_OPTIONS,
        );
        // Lastly, add it to the current request cookies.
        // This is important if a user opens the app for the first time,
        // without any csrfSecret cookie.
        // This is required, because "apollo-upload-client" doesn't support
        // "GET" requests for GraphQL Queries. It only supports "POST".
        // So, when we server-rendering the app and if there is any
        // Query, it fails because of the missing csrfToken.
        appContext.ctx.req.headers.cookie += `; ${CSRF_SECRET_KEY}=${csrfSecret}`;
      }

      // Create a csrfToken
      csrfToken = tokens.create(csrfSecret);
      // Store it in the response to use in later HOCs etc.
      // This is also required because of GraphQL Queries made bu "POST" requests.
      appContext.ctx.res.locals = { csrfToken };
    }
    // Get initial pageProps.
    const pageProps = await AppComponent.getInitialProps?.(appContext);
    // Return the pageProps with the fresh csrfToken.
    // csrfToken will be renewed everytime the app server-rendered.
    return { ...pageProps, csrfToken };
  };
  return WithCSRF;
};

export default withCSRF;
