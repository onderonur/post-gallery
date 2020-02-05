import React, { useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Routes from "Routes";

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

  return <Routes />;
};

export default App;
