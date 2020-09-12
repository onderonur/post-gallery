import React from 'react';
import App from 'next/app';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@src/theme';
import AppLayout from '@src/components/AppLayout';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ConfirmDialogProvider from '@src/contexts/ConfirmDialogContext';
import ViewerProvider from '@src/contexts/ViewerContext';
import SyncAuthBetweenTabs from '@src/components/SyncAuthBetweenTabs';
import { DefaultSeo, DefaultSeoProps } from 'next-seo';
import withApollo from '@src/hocs/withApollo';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import Head from 'next/head';
import withCSRF from '@src/hocs/withCSRF';
import { appTitle } from '@src/utils/appTitle';
import { getDataFromTree } from '@apollo/client/react/ssr';
import BaseSnackbarProvider from '@src/contexts/BaseSnackbarProvider';
import { ThemeProvider } from 'emotion-theming';
import withRouter, { WithRouterProps } from 'next/dist/client/with-router';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

dayjs.extend(relativeTime);

// https://nextjs.org/docs/api-reference/next.config.js/environment-variables
// Trying to destructure process.env variables won't work due to the nature of webpack DefinePlugin.
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getDefaultSeoConfig = (pathname: string): DefaultSeoProps => {
  const url = `${NEXT_PUBLIC_BASE_URL}${pathname}`;
  const description = `${appTitle} Web Site`;
  return {
    titleTemplate: `%s | ${appTitle}`,
    description,
    canonical: url,
    openGraph: {
      title: appTitle,
      description,
      type: 'website',
      locale: 'en_IE',
      url,
      site_name: appTitle,
    },
    additionalMetaTags: [
      {
        property: 'dc:creator',
        content: 'Onur ÖNDER',
      },
      {
        name: 'application-name',
        content: appTitle,
      },
    ],
  };
};

type MyAppProps = WithRouterProps;

// Example for material-ui with next-js:
// https://github.com/mui-org/material-ui/tree/master/examples/nextjs
class MyApp extends App<MyAppProps> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <DefaultSeo {...getDefaultSeoConfig(router.asPath)} />
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <BaseSnackbarProvider>
                <ConfirmDialogProvider>
                  <ViewerProvider>
                    <SyncAuthBetweenTabs>
                      <AppLayout>
                        <Component {...pageProps} />
                      </AppLayout>
                    </SyncAuthBetweenTabs>
                  </ViewerProvider>
                </ConfirmDialogProvider>
              </BaseSnackbarProvider>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </>
    );
  }
}

export default withCSRF(withApollo(withRouter(MyApp), { getDataFromTree }));
