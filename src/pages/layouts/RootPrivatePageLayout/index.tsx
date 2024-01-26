import { Header } from '@/components/Header';
import { useAppDispatch } from '@/store';
import { authActions } from '@/store/user';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Box, Toolbar } from '@mui/material';
import { FC, useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

const RootPrivatePageLayout: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const setAuthToken = async () => {
      const token = await getAccessTokenSilently();
      dispatch(authActions.setToken({ token }));
    };
    setAuthToken();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      <Box component='main'>
        {navigation.state === 'loading' && <p>Loading...</p>}

        <Header />
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
};

export default withAuthenticationRequired(RootPrivatePageLayout, {
  onRedirecting: () => <div>Loading...</div>,
});
