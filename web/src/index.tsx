import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Cookies from "js-cookie";

const client = new ApolloClient({
  uri: "/graphql",
  credentials: "same-origin",
  request: operation => {
    const csrfToken = Cookies.get("csrfToken");
    const headers: any = {};
    if (csrfToken) {
      headers["x-csrf-token"] = csrfToken;
    }
    operation.setContext({
      headers,
    });
  },
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
