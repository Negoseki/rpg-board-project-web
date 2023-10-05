import apiService from '@/services/api';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { FC, useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

const RootPrivatePageLayout: FC = () => {
  const navigation = useNavigation();

  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const setAuthToken = async () => {
      const token = await getAccessTokenSilently();
      apiService.setAuthToken(token);
    };
    setAuthToken();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      <main>
        {navigation.state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
};

export default withAuthenticationRequired(RootPrivatePageLayout, {
  onRedirecting: () => <div>Loading...</div>,
});
