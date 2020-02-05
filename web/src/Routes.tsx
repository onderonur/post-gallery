import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./views/Login";
import Posts from "views/Posts";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <Posts />
      </Route>
    </Switch>
  );
};

export default Routes;
