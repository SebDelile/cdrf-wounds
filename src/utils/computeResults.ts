import { initialResults } from '@/constants/initialResults';
import { woundTable } from '@/constants/woundTable';
import { dice, diceType } from '@/constants/dice';
import { inputsType } from '@/types/inputsType';
import { outputsType } from '@/types/outputsType';
import { woundIntensityType } from '@/constants/woundIntensity';
import { rien, tueNet, woundResultsType } from '@/constants/woundResults';

export const computeResults = (
  inputs: inputsType,
  isDebug: boolean
): outputsType => {
  const debug: string[] = [];
  const results = { ...initialResults };
  const { FOR, RES, armeSacree, armureSacree, tirImmobile, fleau, durACuire } =
    inputs;
  const getIntensity = (dice: diceType) => {
    const rawIntensity = Math.floor((FOR + dice - RES) / 2);
    const intensityWithLineShift =
      rawIntensity + Number(tirImmobile) + Number(fleau) - Number(durACuire);
    return Math.min(
      Math.max(intensityWithLineShift, -1),
      9
    ) as woundIntensityType;
  };

  dice.forEach((d1) => {
    // handle doubles
    const result = armureSacree
      ? rien
      : armeSacree
      ? tueNet
      : readWoundTable(d1, getIntensity(d1));
    results[result]++;
    debug.push(`${d1}-${d1} : ${result}`);

    // handle non-doubles (each is counted twice, ie 1-5 & 5-1)
    dice
      .filter((d2) => d2 < d1)
      .forEach((d2) => {
        const result = readWoundTable(d2, getIntensity(d1));
        results[result] += 2;
        debug.push(`${d1}-${d2} : ${result}`);
        debug.push(`${d2}-${d1} : ${result}`);
      });
  });
  if (isDebug) {
    console.log(debug.sort());
  }
  return results;
};

const readWoundTable = (
  localization: diceType,
  intensity: woundIntensityType
): woundResultsType => woundTable[localization][intensity];
