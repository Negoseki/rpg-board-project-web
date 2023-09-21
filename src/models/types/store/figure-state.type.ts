import { PositionState } from './position-state.type';

export type FiguresState = { [id: string]: FigureState };

export type FigureState = {
  id: string;
  imageUrl: string;
  name: string;
  size: number;
  position: PositionState;
};
