import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarProvider } from 'notistack';
import BaseIconButton from '@src/components/BaseIconButton';

// add action to all snackbars
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notistackRef = React.createRef<any>();

// This is used to show snackbars from outside the App,
// e.g., in the "onError" handler of the "withApollo" hoc.
export const notifyErrorByRef = (message: string) => {
  notistackRef.current?.enqueueSnackbar(message, { variant: 'error' });
};

const onClickDismiss = (key: string) => () => {
  notistackRef.current.closeSnackbar(key);
};
const renderSnackbarAction = (key: string) => (
  <BaseIconButton color="inherit" onClick={onClickDismiss(key)}>
    <CloseIcon fontSize="inherit" />
  </BaseIconButton>
);

// If we need to show snackbars from inside the React components:
// export function useBaseSnackbar() {
//   const { enqueueSnackbar } = useSnackbar();

//   const notifyError = useCallback(
//     (error: string | Error) => {
//       enqueueSnackbar(error instanceof Error ? error.message : error, {
//         variant: 'error',
//       });
//     },
//     [enqueueSnackbar],
//   );

//   return { notifyError };
// }

type BaseSnackbarProviderProps = React.PropsWithChildren<{}>;

function BaseSnackbarProvider({ children }: BaseSnackbarProviderProps) {
  return (
    <SnackbarProvider ref={notistackRef} action={renderSnackbarAction}>
      {children}
    </SnackbarProvider>
  );
}

export default BaseSnackbarProvider;
