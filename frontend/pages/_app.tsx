import React from "react";
import App from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "@/theme";
import AppLayout from "@/components/AppLayout";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ConfirmDialogProvider from "@/components/ConfirmDialog";
import ViewerProvider from "@/components/ViewerProvider";
import SyncAuthBetweenTabs from "@/components/SyncAuthBetweenTabs";
import { DefaultSeo, DefaultSeoProps } from "next-seo";
import withApollo from "@/lib/withApollo";
import NProgress from "nprogress";
import { Router } from "next/router";
import Head from "next/head";
import { getDataFromTree } from "@apollo/react-ssr";
import withCSRF from "@/lib/withCSRF";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

dayjs.extend(relativeTime);

const nextSeoDefaults: DefaultSeoProps = {
  titleTemplate: "%s | Post Gallery",
  description: "Post Gallery Web Site",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "http://localhost:4000",
    site_name: "Post Gallery",
  },
};

// Example for material-ui with next-js:
// https://github.com/mui-org/material-ui/tree/master/examples/nextjs
class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <DefaultSeo {...nextSeoDefaults} />
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <ConfirmDialogProvider>
            <ViewerProvider>
              <SyncAuthBetweenTabs>
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
              </SyncAuthBetweenTabs>
            </ViewerProvider>
          </ConfirmDialogProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default withCSRF(withApollo(MyApp, { getDataFromTree }));
