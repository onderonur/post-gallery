import React, { useState, useCallback } from "react";
import { useContext, useEffect } from "react";
import BaseDialog from "./BaseDialog";
import { DialogActions, DialogContentText } from "@material-ui/core";
import BaseDialogCancelButton from "./BaseDialog/components/BaseDialogCancelButton";
import BaseDialogTitle from "./BaseDialog/components/BaseDialogTitle";
import BaseDialogContent from "./BaseDialog/components/BaseDialogContent";
import BaseButton from "./BaseButton";
import useDialogState from "@/components/BaseDialog/hooks/useDialogState";
import { useRouter } from "next/router";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmText: string;
  onConfirm: VoidFunction;
}

type ConfirmDialogContextValue = (props: ConfirmDialogProps | null) => void;

const ConfirmDialogContext = React.createContext<ConfirmDialogContextValue>(
  {} as ConfirmDialogContextValue,
);

export const useConfirmDialog = () => {
  const showConfirm = useContext(ConfirmDialogContext);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      showConfirm(null);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, showConfirm]);

  return showConfirm;
};

const ConfirmDialogProvider: React.FC = ({ children }) => {
  const { isOpen, open, close } = useDialogState();
  const [props, setProps] = useState<ConfirmDialogProps>();

  const confirm = useCallback(
    (newProps) => {
      setProps(newProps);
      if (newProps) {
        open();
      }
    },
    [open],
  );

  const { title, description, confirmText = "Ok", onConfirm } = props || {};

  return (
    <>
      <ConfirmDialogContext.Provider value={confirm}>
        {children}
      </ConfirmDialogContext.Provider>
      {isOpen && (
        <BaseDialog open maxWidth="xs" onClose={close}>
          <BaseDialogTitle hideCloseButton>{title}</BaseDialogTitle>
          <BaseDialogContent>
            {typeof description === "string" ? (
              <DialogContentText>{description}</DialogContentText>
            ) : (
              description
            )}
          </BaseDialogContent>
          <DialogActions>
            <BaseDialogCancelButton />
            <BaseButton
              color="primary"
              onClick={() => {
                onConfirm?.();
                // Closing the confirm dialog after confirm
                close();
              }}
            >
              {confirmText}
            </BaseButton>
          </DialogActions>
        </BaseDialog>
      )}
    </>
  );
};

export default ConfirmDialogProvider;
