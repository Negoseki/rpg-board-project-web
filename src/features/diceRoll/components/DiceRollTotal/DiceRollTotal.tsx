import { Box, Typography } from '@mui/material';
import { ReactElement, useMemo } from 'react';
import { DiceType } from '../../types';
import { DiceRollType } from '../../types/dice-roll-type.enum';
import { DiceRollValue } from '../DiceRollValue';

type DiceRollTotal = {
  list: DiceRollType[];
};

export const DiceRollTotal = ({ list }: DiceRollTotal): ReactElement => {
  const diceTypeList = useMemo(
    () =>
      list.reduce<{ [key: string]: number }>(
        (p, c) => (p[c.type] ? { ...p, [c.type]: p[c.type] + 1 } : { ...p, [c.type]: 1 }),
        {},
      ),
    [list],
  );

  const total = useMemo(() => list.reduce((p, c) => p + (c.value ?? 0), 0), [list]);

  return (
    <>
      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={4}>
        {diceTypeList &&
          Object.entries(diceTypeList).map((dice, i) => (
            <Box key={i} display={'flex'} flexDirection={'row'} alignItems={'center'}>
              <DiceRollValue size={{ height: 32, width: 32 }} type={dice[0] as DiceType} />
              <Typography fontSize={32} color='primary.main'>
                {dice[1]}
              </Typography>
            </Box>
          ))}
      </Box>
      <Box>
        <Typography fontSize={32} color='primary.main'>
          Total: {total}
        </Typography>
      </Box>
    </>
  );
};
