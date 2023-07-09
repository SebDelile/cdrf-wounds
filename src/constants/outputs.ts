import { diceType } from './dice';
import { woundResultsType } from './woundResults';

// each index in the array corresponds to the possible result of a wound test :
// see ./woundResults.ts
// The value is the number of times this result was got

// everything is empty on beginning of the calculation
export const initialOutputs = new Array(6).fill(0) as outputsType;

export type outputsType = [number, number, number, number, number, number];

// for the list of all results
export type detailledOutputType = {
  dice: diceType[];
  bonus: number[];
  result: woundResultsType;
};

// for the list of all results
export type groupedDetailledOutputType = {
  dice: diceType[];
  bonus: string[] | number[];
  count?: number;
  result: woundResultsType;
};
