import { groupedDetailledOutputType } from '@/constants/outputs';

export const concatDetailledOutput = ({
  dice,
  result,
  bonus,
}: groupedDetailledOutputType) =>
  `${dice.join('')}_${bonus.join('')}_${result}`;
