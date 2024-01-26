import { boardRoutes } from '@/features/board';
import RootPrivatePageLayout from '@/pages/layouts/RootPrivatePageLayout';
import { Navigate, RouteObject } from 'react-router-dom';

const privateRoutes: RouteObject = {
  path: '/',
  element: <RootPrivatePageLayout />,
  children: [
    { path: '', element: <Navigate to='/board' /> },
    {
      path: 'board',
      children: boardRoutes,
    },
  ],
};

export { privateRoutes };
