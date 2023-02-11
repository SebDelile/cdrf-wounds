import { diceType } from './dice';
import { woundIntensityType } from './woundIntensity';
import { woundResultsType } from './woundResults';

export const woundTable: WoundTableType = {
  1: {
    [-1]: 0,
    0: 1,
    1: 1,
    2: 2,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 3,
    8: 4,
    9: 4,
  },
  2: {
    [-1]: 1,
    0: 1,
    1: 2,
    2: 2,
    3: 3,
    4: 3,
    5: 3,
    6: 4,
    7: 4,
    8: 4,
    9: 5,
  },
  3: {
    [-1]: 1,
    0: 2,
    1: 2,
    2: 3,
    3: 3,
    4: 4,
    5: 4,
    6: 4,
    7: 5,
    8: 5,
    9: 5,
  },
  4: {
    [-1]: 2,
    0: 2,
    1: 3,
    2: 3,
    3: 4,
    4: 4,
    5: 5,
    6: 5,
    7: 5,
    8: 5,
    9: 5,
  },
  5: {
    [-1]: 2,
    0: 3,
    1: 4,
    2: 4,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
    7: 5,
    8: 5,
    9: 5,
  },
  6: {
    [-1]: 2,
    0: 3,
    1: 4,
    2: 4,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
    7: 5,
    8: 5,
    9: 5,
  },
};

export type woundTableColumnType = {
  [index in woundIntensityType]: woundResultsType;
};
export type WoundTableType = {
  [index in diceType]: woundTableColumnType;
};
