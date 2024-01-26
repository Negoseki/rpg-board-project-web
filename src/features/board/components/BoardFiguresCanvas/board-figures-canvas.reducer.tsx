import { Reducer } from 'react';
import { BoardFigure } from '../../types/board-figure.type';

type State = {
  isDrag: boolean;
  item: BoardFigure | Omit<BoardFigure, 'id'> | null;
  currentPosition: { x: number; y: number };
};

type StartDragAction = {
  type: 'start';
  payload: {
    item: BoardFigure | Omit<BoardFigure, 'id'>;
    currentPosition: { x: number; y: number };
  };
};

type UpdatePositionAction = {
  type: 'updatePosition';
  payload: {
    currentPosition: { x: number; y: number };
  };
};
type EndDragAction = { type: 'end' };

type Action = StartDragAction | EndDragAction | UpdatePositionAction;

const dragInitial: State = {
  isDrag: false,
  item: null,
  currentPosition: { x: 0, y: 0 },
};
const dragReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'start':
      return { ...state, isDrag: true, item: action.payload.item };
    case 'updatePosition':
      return { ...state, currentPosition: action.payload.currentPosition };
    case 'end':
      return { ...state, isDrag: false, item: null, offset: null };
    default:
      return { ...dragInitial };
  }
};

export { dragInitial, dragReducer };
