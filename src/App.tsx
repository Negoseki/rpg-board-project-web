import { useEffect } from 'react';
import Board from './components/Board';
import { useAppDispatch } from './store/redux';
import { fetchBoardData } from './store/redux/board.actions';

function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchBoardData());
  }, [dispatch]);

  return <Board />;
}

export default App;
