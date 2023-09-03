import { diceType } from '@/constants/dice';

// the form input types
export type inputsType = {
  FORmoinsRES: number;
  double6Tue: boolean;
  //
  jetAmplifie: boolean;
  armeSacree: boolean;
  tirImmobile: boolean;
  fleau: boolean;
  feroce: boolean;
  epeeHache: boolean;
  vapeurFOR: boolean;
  toxique: null | 0 | diceType;
  //
  jetAttenue: boolean;
  armureSacree: boolean;
  durACuire: boolean;
  ethere: boolean;
  vulnerable: boolean;
  immuJambes: boolean;
  immuTete: boolean;
  immuSonne: boolean;
};

export const initialInputs: inputsType = {
  FORmoinsRES: 0,
  double6Tue: false,
  //
  jetAmplifie: false,
  armeSacree: false,
  tirImmobile: false,
  fleau: false,
  feroce: false,
  epeeHache: false,
  vapeurFOR: false,
  toxique: null,
  //
  jetAttenue: false,
  armureSacree: false,
  durACuire: false,
  ethere: false,
  vulnerable: false,
  immuJambes: false,
  immuTete: false,
  immuSonne: false,
};
