import React, { useContext, useEffect, useMemo } from 'react';
import { useOverlayState } from '@src/modules/shared/SharedHooks';

type AppLayoutContextValue = {
  isDrawerOpen: boolean;
  openDrawer: VoidFunction;
  closeDrawer: VoidFunction;
  onIsSimpleLayoutChange: (isSimpleLayout: boolean) => void;
};

const AppLayoutContext = React.createContext<AppLayoutContextValue>(
  {} as AppLayoutContextValue,
);

export function useAppDrawer() {
  const { isDrawerOpen, openDrawer, closeDrawer } = useContext(
    AppLayoutContext,
  );
  return { isDrawerOpen, openDrawer, closeDrawer };
}

// Hides the AppHeader and AppDrawer on mount and shows it on unmount.
export function useSimpleLayout() {
  const { onIsSimpleLayoutChange } = useContext(AppLayoutContext);

  useEffect(() => {
    onIsSimpleLayoutChange(true);
    return () => {
      onIsSimpleLayoutChange(false);
    };
  }, [onIsSimpleLayoutChange]);
}

type AppLayoutProviderProps = React.PropsWithChildren<{
  onIsSimpleLayoutChange: (visible: boolean) => void;
}>;

function AppLayoutProvider({
  onIsSimpleLayoutChange,
  children,
}: AppLayoutProviderProps) {
  const { isOpen, open, close } = useOverlayState();

  const contextValue = useMemo<AppLayoutContextValue>(() => {
    return {
      isDrawerOpen: isOpen,
      openDrawer: open,
      closeDrawer: close,
      onIsSimpleLayoutChange,
    };
  }, [close, isOpen, onIsSimpleLayoutChange, open]);

  return (
    <AppLayoutContext.Provider value={contextValue}>
      {children}
    </AppLayoutContext.Provider>
  );
}

export default AppLayoutProvider;
