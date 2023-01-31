import { initialResults } from '@/constants/initialResults';
import { woundTable } from '@/constants/woundTable';
import { dice, diceType } from '@/constants/dice';
import { inputsType } from '@/types/inputsType';
import { outputsType } from '@/types/outputsType';
import { woundIntensityType } from '@/constants/woundIntensity';
import { woundResultsType } from '@/constants/woundResults';

export const computeResults = (inputs: inputsType): outputsType => {
  const results = { ...initialResults };
  const { FOR, RES } = inputs;
  const getIntensity = (dice: diceType) =>
    Math.min(
      Math.max(Math.floor((FOR + dice - RES) / 2), -1),
      9
    ) as woundIntensityType;

  dice.forEach((d1) => {
    // handle doubles
    const result = readWoundTable(d1, getIntensity(d1));
    results[result]++;

    // handle non-doubles (each is counted twice, ie 1-5 & 5-1)
    dice
      .filter((d2) => d2 < d1)
      .forEach((d2) => {
        const result = readWoundTable(d2, getIntensity(d1));
        results[result] += 2;
      });
  });
  return results;
};

const readWoundTable = (
  localization: diceType,
  intensity: woundIntensityType
): woundResultsType => woundTable[localization][intensity];
