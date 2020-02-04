import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const Title = styled(Typography)`
  flex-grow: 1;
`;

const AppHeader = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Title variant="h6">Post Gallery</Title>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
