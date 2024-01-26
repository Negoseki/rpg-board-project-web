import { Box } from '@mui/material';
import { ReactElement, memo } from 'react';
import { Figure as FigureType } from '../../types';

type FigureProps = {
  figure?: FigureType;
  icon?: ReactElement;
  bgColor?: string;
  size: {
    width: number;
    height: number;
  };
};

const Figure = memo(function Figure({ figure, size, icon, bgColor }: FigureProps) {
  return (
    <Box
      bgcolor={bgColor ?? 'transparent'}
      borderRadius='6px'
      display='flex'
      justifyContent='center'
      alignItems='center'
      color='white'
      style={{
        width: size.width,
        height: size.height,
      }}
    >
      {icon && icon}
      {figure && (
        <img width={size.width} height={size.height} src={figure.imageUrl} alt={figure.name} />
      )}
    </Box>
  );
});

export { Figure };
