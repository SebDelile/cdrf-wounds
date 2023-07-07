import { detailledOutputType } from '@/constants/outputs';

export const concatDetailledOutput = ({
  dice,
  result,
  bonus,
}: detailledOutputType) => `${dice.join('')}${bonus.join('')}${result}`;
