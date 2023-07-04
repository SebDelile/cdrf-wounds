import { detailledOutputType } from '@/constants/outputs';

export const concatDetailledOutput = ({
  dice,
  result,
  vapeurBonus,
}: detailledOutputType) => `${dice.join('')}${result}${vapeurBonus}`;
