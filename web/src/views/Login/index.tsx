import React from "react";
import GoogleSignInButton from "../../GoogleSignInButton";
import { Container, Typography, Box, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const Login = () => {
  return (
    <div>
      <Box display="flex" justifyContent="flex-end">
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h1">Log in</Typography>
          <GoogleSignInButton />
        </Box>
      </Container>
    </div>
  );
};

export default Login;
