import { DiceType } from '../types';

export const mapDiceTypeValue: Record<DiceType, number> = {
  [DiceType.D4]: 4,
  [DiceType.D6]: 6,
  [DiceType.D8]: 8,
  [DiceType.D10]: 10,
  [DiceType.D12]: 12,
  [DiceType.D20]: 20,
};
