import { outputsType } from '@/types/outputsType';

// same position as in outputsType, used in the graph and table
export const woundResultsLabels = [
  'Rien',
  'Sonné',
  'Légère',
  'Grave',
  'Critique',
  'Tue net',
] as const;

// everything is empty on beginning of the calculation
export const initialResults = new Array(6).fill(0) as outputsType;

export type woundResultsType = 0 | 1 | 2 | 3 | 4 | 5;
