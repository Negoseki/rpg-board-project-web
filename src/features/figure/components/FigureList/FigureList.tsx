import { Add } from '@mui/icons-material';
import { Box, ButtonBase, Skeleton } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useGetFiguresQuery } from '../../api/figure.service';
import { Figure as FigureType } from '../../types';
import { Figure } from '../Figure/Figure';
import { FigureForm } from '../FigureForm';

export type FigureListProps = {
  onFigureClick?: (figure: FigureType) => void;
  figureConfig?: {
    size: {
      width: number;
      height: number;
    };
  };
};

export const FigureList = ({
  onFigureClick,
  figureConfig = { size: { width: 128, height: 128 } },
}: FigureListProps): ReactElement => {
  const { data: figures = [], isLoading } = useGetFiguresQuery();
  const [open, setOpen] = useState(false);

  return (
    <>
      <FigureForm open={open} onClose={() => setOpen(false)} />
      <Box display='flex' gap={2} flexWrap='wrap'>
        <ButtonBase onClick={() => setOpen(true)}>
          <Figure size={figureConfig.size} icon={<Add fontSize='large' />} bgColor='primary.main' />
        </ButtonBase>

        {isLoading &&
          React.Children.toArray(
            Array(5).map(() => (
              <Skeleton variant='rectangular' animation='wave' sx={figureConfig.size} />
            )),
          )}

        {figures &&
          figures.map((figure) => (
            <ButtonBase
              key={figure.id}
              disableRipple={!onFigureClick}
              onClick={() => onFigureClick && onFigureClick(figure)}
            >
              <Figure figure={figure} size={figureConfig.size} bgColor='primary.main'></Figure>
            </ButtonBase>
          ))}
      </Box>
    </>
  );
};
