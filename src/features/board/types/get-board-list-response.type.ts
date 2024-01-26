import { BoardFigures } from './board-figure.type';

export type GetBoardListResponse = {
  id: string;
  name: string;
  figures: BoardFigures;
}[];
