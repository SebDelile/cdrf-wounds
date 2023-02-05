import { initialResults } from '@/constants/woundResults';
import { dice, diceType } from '@/constants/dice';
import { inputsType } from '@/types/inputsType';
import { outputsType } from '@/types/outputsType';
import { woundIntensityType } from '@/constants/woundIntensity';
import { woundResultsLabels } from '@/constants/woundResults';
import { readWoundTable } from './readWoundTable';
import { setupWoundTable } from './setupWoundTable';

export const computeResults = (
  inputs: inputsType,
  isDebug: boolean
): outputsType => {
  const debug: string[] = [];
  const results = [...initialResults] as outputsType;
  const woundTable = setupWoundTable(inputs);
  const {
    FOR,
    RES,
    armeSacree,
    armureSacree,
    tirImmobile,
    fleau,
    durACuire,
    vapeurFOR,
  } = inputs;

  (vapeurFOR ? dice : [0]).forEach((vapeurBonus) => {
    const getIntensity = (dice: diceType) => {
      const rawIntensity = Math.floor((FOR + dice + vapeurBonus - RES) / 2);
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
        ? 0
        : armeSacree
        ? 5
        : readWoundTable(woundTable, d1, getIntensity(d1));
      results[result]++;
      debug.push(`${d1}-${d1} : ${woundResultsLabels[result]}`);

      // handle non-doubles (each is counted twice, ie 1-5 & 5-1)
      dice
        .filter((d2) => d2 < d1)
        .forEach((d2) => {
          const result = readWoundTable(woundTable, d2, getIntensity(d1));
          results[result] += 2;
          debug.push(`${d1}-${d2} : ${woundResultsLabels[result]}`);
          debug.push(`${d2}-${d1} : ${woundResultsLabels[result]}`);
        });
    });
  });
  if (isDebug) {
    console.log(debug.sort());
  }
  return results;
};
