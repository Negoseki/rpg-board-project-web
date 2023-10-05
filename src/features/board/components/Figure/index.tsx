import { FC, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '@/models/types/store/app-state.type';
import { DragDropStateType } from '@/models/types/store/drag-drop-state.type';
import { FigureState } from '@/models/types/store/figure-state.type';
import { useAppDispatch } from '@/store/redux';
import { placeFigure } from '@/store/redux/board';
import { dragDropActions } from '@/store/redux/drag-drop';

const Figure: FC<{ figure: FigureState }> = ({ figure }) => {
  const dispatch = useAppDispatch();
  const dragDropState = useSelector<AppState, DragDropStateType>((state) => state.dragDrop);

  const tileSize = useSelector<AppState, number>((state) => state.board.tileSize);

  const figureSize = (figure.size || 1) * tileSize;
  let calcX = figure.position.x * tileSize;
  let calcY = figure.position.y * tileSize;

  if (dragDropState.selectedFigure === figure && dragDropState.isDrag) {
    calcX = dragDropState.currentPosition.x - figureSize / 2;
    calcY = dragDropState.currentPosition.y - figureSize / 2;
  }

  const handleOnMouseDown = (ev: MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
    dispatch(dragDropActions.onDragStart(figure));
  };

  const handleOnMouseUp = (ev: MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
    dispatch(placeFigure(figure));
  };

  return (
    <div
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      style={{
        width: figureSize,
        height: figureSize,
        position: 'absolute',
        left: calcX,
        top: calcY,
      }}
    >
      <img width={figureSize} height={figureSize} src={figure.imageUrl} alt={figure.name} />
    </div>
  );
};

export default Figure;
