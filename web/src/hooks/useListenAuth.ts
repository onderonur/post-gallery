import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import useSyncLogout from "./useSyncLogoutBetweenTabs";

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

const useListenAuth = () => {
  const { data, loading } = useQuery(GET_VIEWER);

  useSyncLogout();

  const viewer = data?.viewer;
  return { viewer, loading };
};

export default useListenAuth;
