import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./views/Login";
import AppHeader from "AppHeader";
import styled from "styled-components";
import { Container } from "@material-ui/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppHeaderOffset = styled.div(({ theme }) => theme.mixins.toolbar as any);

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <AppHeader />
          <AppHeaderOffset />
          <Container maxWidth="lg">deneme</Container>
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
