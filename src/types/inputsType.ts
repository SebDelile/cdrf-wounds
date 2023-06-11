import { diceType } from '@/constants/dice';

// the form input types
export type inputsType = {
  FOR: number;
  jetAmplifie: boolean;
  armeSacree: boolean;
  tirImmobile: boolean;
  fleau: boolean;
  feroce: boolean;
  epeeHache: boolean;
  vapeurFOR: boolean;
  toxique: null | 0 | diceType;
  //
  RES: number;
  jetAttenue: boolean;
  armureSacree: boolean;
  durACuire: boolean;
  ethere: boolean;
  vulnerable: boolean;
  immuJambes: boolean;
  immuTete: boolean;
  immuSonne: boolean;
};
