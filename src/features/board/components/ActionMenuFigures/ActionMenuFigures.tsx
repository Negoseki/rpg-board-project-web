import { FigureList } from '@/features/figure';
import { FigureTypes } from '@/features/figure/';
import { useAppDispatch } from '@/store';
import { ReactElement } from 'react';
import { boardActions } from '../../stores';

export const ActionMenuFigures = (): ReactElement => {
  const dispatch = useAppDispatch();
  const handleFigureClick = (figure: FigureTypes.Figure): void => {
    dispatch(boardActions.newFigure(figure));
  };

  return (
    <FigureList
      onFigureClick={handleFigureClick}
      figureConfig={{ size: { width: 48, height: 48 } }}
    />
  );
};
