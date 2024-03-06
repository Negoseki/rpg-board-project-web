import { ReactComponent as D10Icon } from '@/assets/icons/d10.svg';
import { ReactComponent as D10FrameIcon } from '@/assets/icons/d10_frame.svg';
import { ReactComponent as D12Icon } from '@/assets/icons/d12.svg';
import { ReactComponent as D12FrameIcon } from '@/assets/icons/d12_frame.svg';
import { ReactComponent as D20Icon } from '@/assets/icons/d20.svg';
import { ReactComponent as D20FrameIcon } from '@/assets/icons/d20_frame.svg';
import { ReactComponent as D4Icon } from '@/assets/icons/d4.svg';
import { ReactComponent as D4FrameIcon } from '@/assets/icons/d4_frame.svg';
import { ReactComponent as D6Icon } from '@/assets/icons/d6.svg';
import { ReactComponent as D6FrameIcon } from '@/assets/icons/d6_frame.svg';
import { ReactComponent as D8Icon } from '@/assets/icons/d8.svg';
import { ReactComponent as D8FrameIcon } from '@/assets/icons/d8_frame.svg';
import { ElementType } from 'react';
import { DiceType } from '../types';

export const mapDiceTypeIcon: Record<DiceType | string, ElementType> = {
  [DiceType.D4]: D4Icon,
  [DiceType.D6]: D6Icon,
  [DiceType.D8]: D8Icon,
  [DiceType.D10]: D10Icon,
  [DiceType.D12]: D12Icon,
  [DiceType.D20]: D20Icon,
  [`${DiceType.D4}_frame`]: D4FrameIcon,
  [`${DiceType.D6}_frame`]: D6FrameIcon,
  [`${DiceType.D8}_frame`]: D8FrameIcon,
  [`${DiceType.D10}_frame`]: D10FrameIcon,
  [`${DiceType.D12}_frame`]: D12FrameIcon,
  [`${DiceType.D20}_frame`]: D20FrameIcon,
};
