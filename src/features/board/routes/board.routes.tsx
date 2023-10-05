import { RouteObject } from 'react-router-dom';
import BoardPage from '../pages/BoardPage';

const boardRoutes: RouteObject = {
  path: 'board',
  element: <BoardPage />,
};

export { boardRoutes };
