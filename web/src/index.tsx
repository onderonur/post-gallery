import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { ApolloProvider } from "@apollo/react-hooks";
import Cookies from "js-cookie";
import {
  MuiThemeProvider,
  StylesProvider,
  CssBaseline,
} from "@material-ui/core";
import theme from "theme";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import ConfirmDialogProvider from "components/ConfirmDialog";
import ViewerProvider from "components/ViewerProvider";
import { ApolloClient } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable, Operation } from "apollo-link";
import introspectionQueryResultData from "./generated/fragmentTypes.json";
import { createUploadLink } from "apollo-upload-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const setupDayJsPlugins = () => {
  dayjs.extend(relativeTime);
};

setupDayJsPlugins();

interface RequestHeaders {
  ["x-csrf-token"]?: string;
}

const request = (operation: Operation) => {
  const csrfToken = Cookies.get("csrfToken");
  const headers: RequestHeaders = {};
  if (csrfToken) {
    headers["x-csrf-token"] = csrfToken;
  }
  operation.setContext({
    headers,
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) {
          handle.unsubscribe();
        }
      };
    }),
);

// https://www.apollographql.com/docs/react/data/fragments/#fragments-on-unions-and-interfaces
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

// https://www.apollographql.com/docs/react/migrating/boost-migration/#after-1
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          // eslint-disable-next-line no-console
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) {
        // eslint-disable-next-line no-console
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    requestLink,
    createUploadLink({ uri: "/graphql", credentials: "same-origin" }),
  ]),
  cache: new InMemoryCache({ fragmentMatcher }),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <ConfirmDialogProvider>
                <ViewerProvider>
                  <App />
                </ViewerProvider>
              </ConfirmDialogProvider>
            </BrowserRouter>
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
