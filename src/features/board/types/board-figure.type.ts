import { FigureTypes } from '@/features/figure';

type Position = {
  x: number;
  y: number;
};

export type BoardFigure = FigureTypes.Figure & {
  position: Position;
};

export type BoardFigures = BoardFigure[];
