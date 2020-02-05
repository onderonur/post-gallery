import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import ApolloClient from "apollo-boost";
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

interface RequestHeaders {
  ["x-csrf-token"]?: string;
}

const client = new ApolloClient({
  uri: "/graphql",
  credentials: "same-origin",
  request: operation => {
    const csrfToken = Cookies.get("csrfToken");
    const headers: RequestHeaders = {};
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
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <App />
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
