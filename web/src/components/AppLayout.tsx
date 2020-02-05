import React, { useState, useMemo, useContext, useEffect } from "react";
import AppHeader from "components/AppHeader";
import { Container } from "@material-ui/core";

interface AppLayoutContextValue {
  hideAppHeader: VoidFunction;
  showAppHeader: VoidFunction;
}

const AppLayoutContext = React.createContext<AppLayoutContextValue>(
  {} as AppLayoutContextValue,
);

export const useAppLayoutContext = () => useContext(AppLayoutContext);

// Hides the AppHeader on mount and show it on unmount.
export const useHiddenAppHeader = () => {
  const { hideAppHeader, showAppHeader } = useAppLayoutContext();

  useEffect(() => {
    hideAppHeader();
    return () => {
      showAppHeader();
    };
  }, [hideAppHeader, showAppHeader]);
};

const AppLayout: React.FC = ({ children }) => {
  const [isAppHeaderVisible, setIsAppHeaderVisible] = useState(true);

  const appLayoutContextValue = useMemo(() => {
    const hideAppHeader = () => setIsAppHeaderVisible(false);
    const showAppHeader = () => setIsAppHeaderVisible(true);

    return {
      hideAppHeader,
      showAppHeader,
    };
  }, []);

  return (
    <>
      {isAppHeaderVisible && <AppHeader />}
      <Container maxWidth="lg">
        <AppLayoutContext.Provider value={appLayoutContextValue}>
          {children}
        </AppLayoutContext.Provider>
      </Container>
    </>
  );
};

export default AppLayout;
