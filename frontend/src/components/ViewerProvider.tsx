import React, { useContext } from "react";
import gql from "graphql-tag";
import { useGetViewerQuery, User } from "@/generated/graphql";
import Loading from "./Loading";

const GET_VIEWER = gql`
  query GetViewer {
    viewer {
      id
      displayName
      email
      thumbnailUrl
    }
  }
`;

const ViewerContext = React.createContext<User | null | undefined>(null);

export const useViewer = () => {
  const viewer = useContext(ViewerContext);
  return viewer;
};

const ViewerProvider: React.FC = ({ children }) => {
  const { data, loading } = useGetViewerQuery({ query: GET_VIEWER });

  const viewer = data?.viewer;

  if (loading) {
    return <Loading />;
  }

  return (
    <ViewerContext.Provider value={viewer}>{children}</ViewerContext.Provider>
  );
};

export default ViewerProvider;
