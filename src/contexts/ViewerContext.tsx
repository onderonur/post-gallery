import React, { useContext } from 'react';
import { gql } from '@apollo/client';
import {
  useGetViewerQuery,
  GetViewerQuery,
  Maybe,
} from '@src/generated/graphql';
import Loading from '../components/Loading';

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

const ViewerContext = React.createContext<Maybe<GetViewerQuery['viewer']>>(
  null,
);

export const useViewer = () => {
  const viewer = useContext(ViewerContext);
  return viewer;
};

const ViewerProvider: React.FC = ({ children }) => {
  const { data, loading } = useGetViewerQuery({
    query: GET_VIEWER,
    fetchPolicy: 'network-only',
  });

  const viewer = data?.viewer;

  if (loading) {
    return <Loading />;
  }

  return (
    <ViewerContext.Provider value={viewer}>{children}</ViewerContext.Provider>
  );
};

export default ViewerProvider;
