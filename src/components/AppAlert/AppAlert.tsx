import { useAppDispatch } from '@/store';
import { useAppSelector } from '@/store/store';
import { uiActions } from '@/store/ui';
import { Alert, AlertTitle, Slide, SlideProps, Snackbar, SnackbarCloseReason } from '@mui/material';
import { ReactElement } from 'react';

type TransitionLeftProps = SlideProps & {
  children?: ReactElement;
};

function TransitionLeft(props: TransitionLeftProps) {
  return <Slide {...props} direction='right' />;
}

export const AppAlert = () => {
  const dispatch = useAppDispatch();
  const { open, message, type } = useAppSelector((state) => state.ui);

  const handleAlertClose = (_: unknown, reason?: SnackbarCloseReason): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(uiActions.hideAlert());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleAlertClose}
      TransitionComponent={TransitionLeft}
      key={TransitionLeft.name}
    >
      <Alert onClose={handleAlertClose} variant='filled' severity={type}>
        <AlertTitle>{message.title}</AlertTitle>
        {message.description}
      </Alert>
    </Snackbar>
  );
};
