import React, { useState, useMemo, useContext, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import { Container, Box } from "@material-ui/core";

interface AppLayoutContextValue {
  hideAppHeader: VoidFunction;
  showAppHeader: VoidFunction;
}

const AppLayoutContext = React.createContext<AppLayoutContextValue>(
  {} as AppLayoutContextValue,
);

// Hides the AppHeader on mount and show it on unmount.
export const useHideAppHeader = () => {
  const { hideAppHeader, showAppHeader } = useContext(AppLayoutContext);

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
      <Box py={2} clone>
        <Container maxWidth="lg" component="main">
          <AppLayoutContext.Provider value={appLayoutContextValue}>
            {children}
          </AppLayoutContext.Provider>
        </Container>
      </Box>
    </>
  );
};

export default AppLayout;
