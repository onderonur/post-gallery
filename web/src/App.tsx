import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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
  const { data, loading } = useQuery(GET_VIEWER);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return (
      <div>
        401
        <div>
          <a href={`/auth/google?redirectURL=${window.location.href}`}>Login</a>
        </div>
      </div>
    );
  }
  const { viewer } = data;
  return (
    <div>
      {`Hello ${viewer.firstName} ${viewer.lastName}`}
      <div>
        <a href={`/auth/logout?redirectURL=${window.location.href}`}>Logout</a>
      </div>
    </div>
  );
};

export default App;
