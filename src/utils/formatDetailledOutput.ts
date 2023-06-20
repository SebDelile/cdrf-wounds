import { diceType } from '@/constants/dice';
import { woundResultsType } from '@/constants/woundResults';

type formatDetailledOutputType = {
  dice: diceType[];
  vapeurBonus: number;
  result: woundResultsType;
};

export const formatDetailledOutput = ({
  dice,
  vapeurBonus,
  result,
}: formatDetailledOutputType) => ({
  dices: `${dice[0]} - ${dice[1]}${dice[2] ? ` - ${dice[2]}` : ''}${
    vapeurBonus ? ` (vapeur ${vapeurBonus})` : ''
  }`,
  result,
});
