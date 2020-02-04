import React, { useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import GoogleSignInButton from "./GoogleSignInButton";
import { Container } from "@material-ui/core";
import AppHeader from "AppHeader";
import styled from "styled-components";

const GET_VIEWER = gql`
  query GetViewer {
    viewer {
      id
      firstName
      lastName
      email
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppHeaderOffset = styled.div(({ theme }) => theme.mixins.toolbar as any);

const App = () => {
  const { loading } = useQuery(GET_VIEWER);

  // TODO: Listen query string ?logout=...
  useEffect(() => {
    const logoutTimeStampKey = "logout";
    const prevTimeStamp = localStorage.getItem(logoutTimeStampKey);
    const storageListener = () => {
      const timeStamp = localStorage.getItem(logoutTimeStampKey);
      if (prevTimeStamp !== timeStamp) {
        // Redirect to home page
        window.location.href = "/";
      }
    };

    window.addEventListener("storage", storageListener);

    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppHeader />
      <AppHeaderOffset />
      <Container maxWidth="lg">
        <GoogleSignInButton />
      </Container>
    </>
  );
};

export default App;
