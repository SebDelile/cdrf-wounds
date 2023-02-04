import { outputsType } from '@/types/outputsType';
import { woundResults } from './woundResults';

export const initialResults = Object.fromEntries(
  woundResults.map((woundResult) => [woundResult, 0])
) as outputsType;
