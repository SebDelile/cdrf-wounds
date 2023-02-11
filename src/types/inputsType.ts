import { diceType } from '@/constants/dice';

export type inputsType = {
  FOR: number;
  armeSacree: boolean;
  tirImmobile: boolean;
  fleau: boolean;
  feroce: boolean;
  epeeHache: boolean;
  vapeurFOR: boolean;
  toxique: null | 0 | diceType;
  //
  RES: number;
  armureSacree: boolean;
  durACuire: boolean;
  ethere: boolean;
  vulnerable: boolean;
  immuJambes: boolean;
  immuTete: boolean;
  immuSonne: boolean;
};
