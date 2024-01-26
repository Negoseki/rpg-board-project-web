import { EntityState } from '@reduxjs/toolkit';
import { BoardFigure } from './board-figure.type';

export type Board = {
  id: string;
  name: string;
  figures: EntityState<BoardFigure>;
};
export type Boards = Board[];
