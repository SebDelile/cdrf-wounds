// each index in the array corresponds to the possible result of a wound test :
// see ./woundResults.ts
// The value is the number of times this result was got

// everything is empty on beginning of the calculation
export const initialOutputs = new Array(6).fill(0) as outputsType;

export type outputsType = [number, number, number, number, number, number];
