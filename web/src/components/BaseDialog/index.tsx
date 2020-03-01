import React, { useContext, useMemo } from "react";
import { Dialog, DialogProps } from "@material-ui/core";

interface BaseDialogContextValue {
  onClose: VoidFunction;
}

const BaseDialogContext = React.createContext<BaseDialogContextValue>(
  {} as BaseDialogContextValue,
);

interface BaseDialogProviderProps {
  value: BaseDialogContextValue;
}

const BaseDialogProvider: React.FC<BaseDialogProviderProps> = ({
  value,
  children,
}) => {
  return (
    <BaseDialogContext.Provider value={value}>
      {children}
    </BaseDialogContext.Provider>
  );
};

export function useBaseDialogContext() {
  const value = useContext(BaseDialogContext);
  return value;
}

export type BaseDialogProps = Pick<
  DialogProps,
  "open" | "maxWidth" | "scroll"
> & {
  onClose: VoidFunction;
};

const BaseDialog: React.FC<BaseDialogProps> = ({
  open,
  maxWidth = "lg",
  scroll = "body",
  onClose,
  children,
}) => {
  const contextValue = useMemo(() => ({ onClose }), [onClose]);

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={maxWidth}
      scroll={scroll}
      onClose={onClose}
    >
      <BaseDialogProvider value={contextValue}>{children}</BaseDialogProvider>
    </Dialog>
  );
};

export default BaseDialog;
