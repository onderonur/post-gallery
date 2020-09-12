import React, { useContext, useMemo } from 'react';

interface BaseDialogContextValue {
  onClose: VoidFunction;
}

const BaseDialogContext = React.createContext<BaseDialogContextValue>(
  {} as BaseDialogContextValue,
);

export function useBaseDialogContext() {
  const value = useContext(BaseDialogContext);
  return value;
}

interface BaseDialogProviderProps {
  onClose: VoidFunction;
}

const BaseDialogProvider: React.FC<BaseDialogProviderProps> = ({
  onClose,
  children,
}) => {
  const contextValue = useMemo<BaseDialogContextValue>(() => ({ onClose }), [
    onClose,
  ]);

  return (
    <BaseDialogContext.Provider value={contextValue}>
      {children}
    </BaseDialogContext.Provider>
  );
};

export default BaseDialogProvider;
