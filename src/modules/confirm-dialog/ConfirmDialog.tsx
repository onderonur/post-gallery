import React, { useState, useCallback, useContext, useEffect } from 'react';
import BaseDialog from '@src/modules/base-dialog/BaseDialog';
import { DialogActions, DialogContentText } from '@material-ui/core';
import BaseDialogCancelButton from '@src/modules/base-dialog/BaseDialogCancelButton';
import BaseDialogTitle from '@src/modules/base-dialog/BaseDialogTitle';
import BaseDialogContent from '@src/modules/base-dialog/BaseDialogContent';
import BaseButton from '@src/modules/shared/BaseButton';
import { useOverlayState } from '@src/modules/shared/SharedHooks';
import { useRouter } from 'next/router';

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

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, showConfirm]);

  return showConfirm;
};

const ConfirmDialogProvider: React.FC = ({ children }) => {
  const { isOpen, open, close } = useOverlayState();
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

  const { title, description, confirmText = 'Ok', onConfirm } = props || {};

  return (
    <>
      <ConfirmDialogContext.Provider value={confirm}>
        {children}
      </ConfirmDialogContext.Provider>
      {isOpen && (
        <BaseDialog open maxWidth="xs" onClose={close}>
          <BaseDialogTitle hideCloseButton>{title}</BaseDialogTitle>
          <BaseDialogContent>
            {typeof description === 'string' ? (
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
