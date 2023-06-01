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
  //initialize
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
    ethere,
    vulnerable,
    toxique,
  } = inputs;

  // if vapeurFOR, we wrap with an additionnal loop with FOR+1 to FOR+6 around the logic
  (vapeurFOR ? dice : [0]).forEach((vapeurBonus) => {
    
    // the result FOR-RES+1d6 (+Vapeur) with row modifiers
    // /2 is because the woundIntensity is from -1 to 9 (divided by 2 as compared to original wound table)
    const getIntensity = (dice: diceType) => {
      const rawIntensity = Math.floor((FOR + dice + vapeurBonus - RES) / 2);
      const intensityWithLineShift =
        rawIntensity + Number(tirImmobile) + Number(fleau) - Number(durACuire);
      return Math.min(
        Math.max(intensityWithLineShift, -1),
        9
      ) as woundIntensityType;
    };

    // loop on the first dice
    dice.forEach((d1) => {
      // handle doubles
      const result = armureSacree
        ? 0
        : armeSacree
        ? 5
        : readWoundTable(woundTable, d1, getIntensity(d1));
      results[result]++;
      debug.push(`${d1}-${d1} : ${woundResultsLabels[result]}`);

      // roll the second dice, only take cases where 2nd is strictly bigger than 1st (avoid useless repetion + exclude doubles)
      dice
        .filter((d2) => d2 < d1)
        .forEach((d2) => {
          const result = readWoundTable(woundTable, d2, getIntensity(d1));
          // each result is counted twice, ie 1-5 & 5-1
          results[result] += 2;
          debug.push(`${d1}-${d2} : ${woundResultsLabels[result]}`);
          debug.push(`${d2}-${d1} : ${woundResultsLabels[result]}`);
        });
    });
  });

  if (toxique !== null && Number.isInteger(toxique)) {
    // only for results with an actual wound (not "rien" & "sonné")
    // each result is splitted in two, one with the failed toxique test part (result+=1), the other with the success toxic test part (result+=2)
    // example: {result: resulValue} gives [result+1, resultValue*failedPart] & [result+2, resultValue*successedPart], 
    const woundsAfterToxic = [2, 3, 4, 5].flatMap((i) => [
      [
        Math.min(1 + i + Number(vulnerable) - Number(ethere), 5),
        (1 - toxique / 6) * results[i], // toxic test failed
      ],
      [
        Math.min(2 + i + Number(vulnerable) - Number(ethere), 5),
        (toxique / 6) * results[i], //toxic test successed
      ],
    ]);
    // all the results are collapsed to give back the results array
    [2, 3, 4, 5].forEach((i) => {
      results[i] = woundsAfterToxic.reduce(
        (acc, cur) => (cur[0] === i ? acc + cur[1] : acc),
        0
      );
    });
  }

  // to log the detailled results
  if (isDebug) {
    console.log(debug.sort());
    if (Number.isInteger(toxique)) {
      console.log(
        "attention toxique n'est pas pris en compte dans ces résultats"
      );
    }
  }

  return results;
};
