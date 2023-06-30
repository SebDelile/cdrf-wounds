import { outputsType } from '@/constants/outputs';

// same position as in outputsType, used in the chart and table
export const woundResultsLabels = [
  'Rien',
  'Sonné',
  'Légère',
  'Grave',
  'Critique',
  'Tué net',
] as const;

export type woundResultsType = 0 | 1 | 2 | 3 | 4 | 5;
