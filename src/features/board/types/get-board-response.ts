import { BoardFigures } from './board-figure.type';

export type GetBoardResponse = {
  id: string;
  name: string;
  figures: BoardFigures;
};
