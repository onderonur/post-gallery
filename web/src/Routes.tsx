import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import URLS from "constants/urls";
import LoginView from "views/Login";
import UserView from "views/User";
import PostView from "views/Post";
import PostsView from "views/Posts";

const Routes = () => {
  return (
    <Switch>
      <Route path={URLS.login}>
        <LoginView />
      </Route>
      <Route path={URLS.user}>
        <UserView />
      </Route>
      <Route path={URLS.post}>
        <PostView />
      </Route>
      <Route path={URLS.posts}>
        <PostsView />
      </Route>

      <Route path="*">
        <Redirect to={URLS.posts} />
      </Route>
    </Switch>
  );
};

export default Routes;
