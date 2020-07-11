import React from "react";
import withApollo from "next-with-apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { Operation, ApolloLink, Observable } from "apollo-link";
import { onError } from "apollo-link-error";
import introspectionQueryResultData from "@/generated/fragmentTypes.json";
import ApolloClient from "apollo-client";
import { isServer } from "@/utils";
import { getCSRFToken, csrfTokenHeaderKey } from "./withCSRF";

export default withApollo(
  ({ initialState = {}, ctx }) => {
    const request = (operation: Operation) => {
      operation.setContext({
        headers: {
          [csrfTokenHeaderKey]: getCSRFToken(ctx),
          // Passing cookies while SSR
          cookie: isServer() ? ctx?.req?.headers.cookie : undefined,
        },
      });
    };

    const requestLink = new ApolloLink(
      (operation, forward) =>
        new Observable((observer) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let handle: any;
          Promise.resolve(operation)
            .then((operation) => request(operation))
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

    const cache = new InMemoryCache({ fragmentMatcher }).restore(initialState);

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
        createUploadLink({
          uri: "http://localhost:3000/api/graphql",
        }),
      ]),
      cache,
      ssrMode: isServer(),
      // Note for Next.js:
      // If you set this to a small value like "100", it will cause a rendering value.
      // e.g, Expected server HTML to contain a matching <a> in <div>.
      // And the page will look broken.
      // https://www.apollographql.com/docs/react/performance/server-side-rendering/
      // If you are using fetchPolicy: network-only or fetchPolicy: cache-and-network on some of the initial queries,
      // you can pass the ssrForceFetchDelay option to skip force fetching during initialization,
      // so that even those queries run using the cache:
      ssrForceFetchDelay: 5000,
    });
    return client;
  },
  {
    render: ({ Page, props }) => {
      const { apollo } = props;
      return (
        <ApolloProvider client={apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  },
);
