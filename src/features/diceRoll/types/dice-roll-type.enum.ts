import { DiceType } from './dice-type.enum';

export type DiceRollType = {
  id: string;
  type: DiceType;
  value?: number;
};
