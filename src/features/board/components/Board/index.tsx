import { AppState } from '@/models/types/store/app-state.type';
import { BoardStateType } from '@/models/types/store/board-state.type';
import { FigureState } from '@/models/types/store/figure-state.type';
import socket from '@/services/socket';
import { useAppDispatch } from '@/store/redux';
import { boardActions } from '@/store/redux/board';
import { fetchBoardData } from '@/store/redux/board/board.actions';
import { dragDropActions } from '@/store/redux/drag-drop';
import { FC, MouseEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ActionMenu from '../ActionMenu';
import Figure from '../Figure';
import Tile from '../Tile';

const Board: FC = () => {
  const dispatch = useAppDispatch();
  const boardState = useSelector<AppState, BoardStateType>((state) => state.board);
  const figuresList = Object.values(boardState.figures);
  const { id: boardId } = boardState;

  useEffect(() => {
    dispatch(fetchBoardData());
  }, [dispatch]);

  useEffect(() => {
    const socketConnect = async () => {
      await socket.connect('/board', { id: boardId });
      socket.attachListeners<FigureState>({
        event: 'board:updateFigure',
        dispatch,
        action: (figure) => boardActions.updateFigure(figure),
      });
    };

    socketConnect();

    return () => {
      socket.disconnect();
    };
  }, [boardId, dispatch]);

  const handleOnMouseMove = (ev: MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
    dispatch(dragDropActions.onDragMove({ x: ev.clientX, y: ev.clientY }));
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onMouseMove={handleOnMouseMove} onMouseDown={handleOnMouseMove}>
        <div style={{ display: 'flex' }}>
          {boardState.board.map((c, rowI) => (
            <div key={`row_${rowI}`}>
              {c.map((_, colI) => (
                <div key={`row_${rowI}_col_${colI}`}>
                  <Tile tileSize={boardState.tileSize} />
                </div>
              ))}
            </div>
          ))}
        </div>
        {figuresList.length && figuresList.map((v) => <Figure key={v.id} figure={v} />)}
      </div>
      <ActionMenu />
    </div>
  );
};

export default Board;
