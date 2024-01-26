import { RouteObject } from 'react-router-dom';
import { BoardListPage } from './BoardListPage';
import { BoardPage } from './BoardPage';

const boardRoutes: RouteObject[] = [
  {
    path: '',
    element: <BoardListPage />,
  },
  {
    path: ':boardId',
    element: <BoardPage />,
  },
];

export { boardRoutes };
