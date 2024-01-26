import { Board } from '../../types';

export type PositionState = {
  x: number;
  y: number;
};

export type FiguresState = { [id: string]: FigureState };

export type FigureState = {
  id: string;
  imageUrl: string;
  name: string;
  size: number;
  position: PositionState;
};

export type CurrentBoardState = Board | null;

export type BoardStateType = {
  tileSize: number;
  board: number[][];
  currentBoard: CurrentBoardState;
  tempFigure: Omit<FigureState, 'id' | 'position'> | null;
};
