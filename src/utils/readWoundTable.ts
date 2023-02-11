import { diceType } from '@/constants/dice';
import { woundIntensityType } from '@/constants/woundIntensity';
import { woundResultsType } from '@/constants/woundResults';
import { WoundTableType } from '@/constants/woundTable';

export const readWoundTable = (
  woundTable: WoundTableType,
  localization: diceType,
  intensity: woundIntensityType
): woundResultsType => woundTable[localization][intensity];
