import { BoardStateType } from './board-state.type';
import { DragDropStateType } from './drag-drop-state.type';

export type AppState = {
  board: BoardStateType;
  dragDrop: DragDropStateType;
};
