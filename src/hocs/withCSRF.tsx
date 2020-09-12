import React, { useEffect } from 'react';
import nookies from 'nookies';
import { AppProps, AppContext } from 'next/app';
import { NextPageContext } from 'next';
import { Maybe } from '@src/generated/graphql';
import { safeCookieOptions } from '@shared/safeCookieOptions';
import Tokens from 'csrf';
import { isServer } from '@src/utils/isServer';
import { fetcher } from '@shared/fetcher';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __NEXT_DATA__: any;
  }
}

declare module 'http' {
  interface ServerResponse {
    locals: {
      csrfToken: string;
    };
  }
}

const csrfSecretKey = '_csrf';

export const getCSRFToken = (ctx?: Maybe<NextPageContext>) => {
  return isServer()
    ? ctx?.res?.locals.csrfToken
    : window.__NEXT_DATA__.props.csrfToken;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withCSRF = (AppComponent: any) => {
  const WithCSRF = (props: AppProps) => {
    useEffect(() => {
      // Add csrfToken to default fetcher headers for client-side requests
      fetcher.setCSRFToken(getCSRFToken());
    }, []);

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
      let csrfSecret = currentCookies[csrfSecretKey];
      const tokens = new Tokens();
      if (!csrfSecret) {
        // If there is no csrfSecret, first create it.
        csrfSecret = tokens.secretSync();
        // Then, set it in a httpOnly cookie for later use.
        nookies.set(
          appContext.ctx,
          csrfSecretKey,
          csrfSecret,
          safeCookieOptions,
        );
        // Lastly, add it to the current request cookies.
        // This is important if a user opens the app for the first time,
        // without any csrfSecret cookie.
        // This is required, because we use "POST" requests for GraphQL Queries.
        // Otherwise, when we server-rendering the app and if there are any SSR Queries,
        // they would fail because of the missing csrfToken.
        appContext.ctx.req.headers.cookie += `; ${csrfSecretKey}=${csrfSecret}`;
      }

      // Create a csrfToken
      csrfToken = tokens.create(csrfSecret);
      // Store it in the response to use in later HOCs etc.
      // This is also required because of GraphQL Queries made bu "POST" requests.
      appContext.ctx.res.locals = { csrfToken };

      // Add csrfToken to default fetcher headers for SSR requests
      fetcher.setCSRFToken(csrfToken);
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
