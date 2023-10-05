import { FC } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

const LoginPage: FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <main>
        {navigation.state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
};

export default LoginPage;
