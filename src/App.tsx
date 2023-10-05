import { Auth0Provider } from '@auth0/auth0-react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      useRefreshTokens={true}
      authorizationParams={{
        redirect_uri: window.location.origin,
        ui_locales: 'pt-BR',
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  );
}

export default App;
