import { FigureState } from './figure-state.type';
import { PositionState } from './position-state.type';

export type DragDropStateType = {
  isDrag: boolean;
  currentPosition: PositionState;
  selectedFigure: FigureState | null;
};
