import React from "react";
import Routes from "Routes";
import AppLayout from "components/AppLayout";
import useSyncLogoutBetweenTabs from "hooks/useSyncLogoutBetweenTabs";

const App = () => {
  useSyncLogoutBetweenTabs();

  return (
    <AppLayout>
      <Routes />
    </AppLayout>
  );
};

export default App;
