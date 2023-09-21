import { FiguresState } from './figure-state.type';

export type BoardStateType = {
  id: string;
  tileSize: number;
  board: number[][];
  figures: FiguresState;
};
