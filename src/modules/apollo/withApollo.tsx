import React from 'react';
import withApollo from 'next-with-apollo';
import { isServer } from '@src/modules/shared/SharedUtils';
import { getCSRFToken } from '../auth/withCSRF';
import { RequestHeader } from '@shared/RequestHeader';
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  ServerError,
  Operation,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { HttpStatusCode } from '@shared/HttpStatusCode';
import { urls } from '@src/modules/routing/RoutingUtils';
import { relayStylePagination } from '@apollo/client/utilities';
import { Kind, OperationDefinitionNode } from 'graphql';
import { Maybe } from '@src/generated/graphql';
import { notifyErrorByRef } from '@src/modules/base-snackbar/BaseSnackbarProvider';

enum ApolloErrorCode {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

const isMutationOperation = (operation: Operation) => {
  const operationDefinition = operation.query.definitions.find(
    (definition) => definition.kind === Kind.OPERATION_DEFINITION,
  ) as Maybe<OperationDefinitionNode>;

  return operationDefinition?.operation === 'mutation';
};

const redirectToLogin = () => {
  window.location.href = urls.login();
};

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  let shouldRedirectToLogin = false;

  const errorMessages: string[] = [];

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      errorMessages.push(message);
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
    const codes = graphQLErrors.map(({ extensions }) => extensions?.code);
    shouldRedirectToLogin = codes.includes(ApolloErrorCode.UNAUTHENTICATED);
  }

  if (networkError) {
    errorMessages.push(networkError.message);
    // eslint-disable-next-line no-console
    console.log(`[Network error]: ${networkError}`);
    shouldRedirectToLogin =
      shouldRedirectToLogin ||
      (networkError as ServerError).statusCode === HttpStatusCode.UNAUTHORIZED;
  }

  if (shouldRedirectToLogin) {
    redirectToLogin();
  } else {
    const isMutation = isMutationOperation(operation);
    if (!isServer() && isMutation) {
      errorMessages.forEach((message) => {
        notifyErrorByRef(message);
      });
    }
  }
});

export default withApollo(
  ({ initialState = {}, ctx }) => {
    const cache = new InMemoryCache({
      possibleTypes: {
        // If we don't specify these and use a "Reactable" fragment to fetch "Post" or "Comment" fields,
        // they will be fetched and we will see them in Network tab of browser.
        // Bu apollo won't be able to parse the response correctly, and those fields will be missing.
        Reactable: ['Post', 'Comment'],
      },
      typePolicies: {
        Category: {
          fields: {
            posts: relayStylePagination(),
          },
        },
        Post: {
          fields: {
            comments: relayStylePagination(),
          },
        },
        User: {
          fields: {
            posts: relayStylePagination(),
            sessions: relayStylePagination(),
          },
        },
      },
    }).restore(initialState);

    const headers: Record<string, string> = {};
    headers[RequestHeader.CSRF_TOKEN] = getCSRFToken(ctx);
    // Passing cookies while SSR
    const cookie = isServer() ? ctx?.req?.headers.cookie : undefined;
    if (cookie) {
      headers.cookie = cookie;
    }

    const httpLink = new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
      headers,
    });

    const client = new ApolloClient({
      link: ApolloLink.from([errorLink, httpLink]),
      headers,
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
