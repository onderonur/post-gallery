import React from "react";
import GoogleSignInButton from "./components/GoogleSignInButton";
import { Container, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useHiddenAppHeader } from "components/AppLayout";
import { useHistory } from "react-router-dom";
import FlexRow from "components/FlexRow";
import { FlexCol } from "components/FlexCol";

const Login = () => {
  useHiddenAppHeader();
  const history = useHistory();

  return (
    <div>
      <FlexRow justifyContent="flex-end">
        <IconButton onClick={() => history.goBack()}>
          <CloseIcon />
        </IconButton>
      </FlexRow>
      <Container maxWidth="sm" component="main">
        <FlexCol>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            Log in
          </Typography>
          <GoogleSignInButton />
        </FlexCol>
      </Container>
    </div>
  );
};

export default Login;
