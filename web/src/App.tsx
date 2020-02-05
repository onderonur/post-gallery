import React from "react";
import Routes from "Routes";
import AppLayout from "components/AppLayout";
import useSyncLogout from "./hooks/useSyncLogoutBetweenTabs";
import useListenAuth from "./hooks/useListenAuth";

const App = () => {
  const { loading } = useListenAuth();
  useSyncLogout();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout>
      <Routes />
    </AppLayout>
  );
};

export default App;
