import { RouteObject } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const authRoutes: RouteObject = {
  path: 'login',
  element: <LoginPage />,
};

export { authRoutes };
