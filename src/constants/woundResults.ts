import { outputsType } from '@/types/outputsType';

export const woundResultsLabels = [
  'Rien',
  'Sonné',
  'Légère',
  'Grave',
  'Critique',
  'Tue net',
] as const;

export const initialResults = new Array(6).fill(0) as outputsType;

export type woundResultsType = 0 | 1 | 2 | 3 | 4 | 5;
