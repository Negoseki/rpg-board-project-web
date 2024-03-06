import { Box, SvgIcon, Typography, keyframes } from '@mui/material';
import { ReactElement, memo, useEffect, useState } from 'react';
import { mapDiceTypeIcon } from '../../helpers';
import { DiceType } from '../../types';
import { Keyframes } from '@emotion/react';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(720deg);
  }
`;

const showAnimation = keyframes`
  0% {
    margin-top: 0;
  }
  50% {
    margin-top: 0;
  }
  100% {
    margin-top: -100%;
  }
`;

type DiceRollValueProps = {
  type: DiceType;
  index?: number;
  value?: number;
  size?: { width: number; height: number };
};

enum Animation {
  STOP = 'STOP',
  ROLL = 'ROLL',
  SHOW = 'SHOW',
}

const animationsEffect: Record<Animation, Keyframes | ''> = {
  [Animation.STOP]: '',
  [Animation.ROLL]: spinAnimation,
  [Animation.SHOW]: showAnimation,
};

export const DiceRollValue = memo(function DiceRollValue({
  type,
  index,
  value,
  size,
}: DiceRollValueProps): ReactElement {
  const [animationState, setAnimationState] = useState<Animation>(Animation.STOP);

  size = size ?? { width: 64, height: 64 };

  useEffect(() => {
    if (value) {
      setAnimationState(Animation.ROLL);

      return () => {
        setAnimationState(Animation.STOP);
      };
    }
  }, [value, setAnimationState]);

  return (
    <Box width={size.width} height={size.height} overflow={'hidden'}>
      <Box
        width={size.width}
        height={size.height}
        onAnimationEnd={() => setAnimationState(Animation.SHOW)}
        sx={{
          animation: `${animationsEffect[animationState]} ${500 + 100 * (index ?? 0)}ms  linear`,
          animationFillMode: 'forwards',
        }}
      >
        <SvgIcon
          sx={{
            width: size.width,
            height: size.height,
          }}
          color='primary'
          inheritViewBox
          component={mapDiceTypeIcon[`${type}_frame`]}
        />
      </Box>
      <Box
        width={size.width}
        height={size.height}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography fontSize={size.height} color={'primary.main'}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
});
