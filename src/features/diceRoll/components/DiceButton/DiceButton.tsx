import { Button, SvgIcon } from '@mui/material';
import { ReactElement } from 'react';
import { mapDiceTypeIcon } from '../../helpers';
import { DiceType } from '../../types';

type DiceButtonProps = {
  type: DiceType;
  onClick: (type: DiceType) => void;
};

export const DiceButton = ({ type, onClick }: DiceButtonProps): ReactElement => {
  return (
    <Button size='small' variant='contained' onClick={() => onClick(type)}>
      <SvgIcon sx={{ fontSize: 68 }} inheritViewBox component={mapDiceTypeIcon[type]} />
    </Button>
  );
};
