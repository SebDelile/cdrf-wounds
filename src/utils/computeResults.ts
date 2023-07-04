import { dice, diceType } from '@/constants/dice';
import { inputsType } from '@/constants/inputs';
import {
  outputsType,
  detailledOutputType,
  initialOutputs,
} from '@/constants/outputs';
import { woundIntensityType } from '@/constants/woundIntensity';
import { readWoundTable } from './readWoundTable';
import { setupWoundTable } from './setupWoundTable';
import { woundResultsType } from '@/constants/woundResults';

export const computeResults = (
  inputs: inputsType
): [outputsType, detailledOutputType[]] => {
  //initialize
  const outputResults = [...initialOutputs] as outputsType;
  let detailledOutputs: detailledOutputType[] = [];
  const woundTable = setupWoundTable(inputs);
  const {
    FORmoinsRES,
    double6Tue,
    jetAmplifie,
    jetAttenue,
    armeSacree,
    armureSacree,
    tirImmobile,
    fleau,
    durACuire,
    vapeurFOR,
    ethere,
    vulnerable,
    toxique,
    immuJambes,
    immuTete,
  } = inputs;

  // early return if the results can't be calculated
  if (!Number.isInteger(FORmoinsRES)) {
    return [outputResults, detailledOutputs];
  }

  const has3dice = jetAmplifie || jetAttenue;

  // if vapeurFOR, we wrap with an additionnal loop with FOR+1 to FOR+6 around the logic
  (vapeurFOR ? dice : [0]).forEach((vapeurBonus) => {
    // the result FOR-RES+1d6 (+Vapeur) with row modifiers
    // /2 is because the woundIntensity is from -1 to 9 (divided by 2 as compared to original wound table)
    const getIntensity = (dice: diceType) => {
      const rawIntensity = Math.floor((FORmoinsRES + dice + vapeurBonus) / 2);
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
      const result =
        armureSacree || (d1 === 1 && immuJambes) || (d1 >= 5 && immuTete)
          ? 0
          : armeSacree || (d1 === 6 && double6Tue)
          ? 5
          : readWoundTable(woundTable, d1, getIntensity(d1));
      // handle dice are all same (triple for 3 dice roll, double, for 2 dice roll)
      detailledOutputs.push({
        dice: has3dice ? [d1, d1, d1] : [d1, d1],
        vapeurBonus,
        result,
      });
      // handle other doubles for 3 dice rolls (only double with the 2 dice being used)
      if (has3dice) {
        dice
          .filter((d3) => (jetAttenue ? d3 > d1 : d3 < d1))
          .forEach((d3) => {
            [
              [d1, d1, d3],
              [d1, d3, d1],
              [d3, d1, d1],
            ].forEach((dice) => {
              detailledOutputs.push({
                dice,
                vapeurBonus,
                result,
              });
            });
          });
      }

      // roll the second dice, only take cases where 2nd is strictly bigger/lesser than 1st (avoid useless repetion + exclude doubles)
      dice
        .filter((d2) => (jetAttenue ? d2 > d1 : d2 < d1))
        .forEach((d2) => {
          const result = readWoundTable(
            woundTable,
            jetAttenue ? d1 : d2,
            getIntensity(jetAttenue ? d2 : d1)
          );
          if (has3dice) {
            dice
              .filter((d3) => (jetAttenue ? d3 >= d2 : d3 <= d2))
              .forEach((d3) => {
                // three possible positions for 1st dice
                [
                  [d1, d2, d3],
                  [d2, d1, d3],
                  [d2, d3, d1],
                ].forEach((dice) => {
                  detailledOutputs.push({
                    dice,
                    vapeurBonus,
                    result,
                  });
                });

                // three more possibilities if all three dice are different
                if (d2 !== d3) {
                  [
                    [d1, d3, d2],
                    [d3, d1, d2],
                    [d3, d2, d1],
                  ].forEach((dice) => {
                    detailledOutputs.push({
                      dice,
                      vapeurBonus,
                      result,
                    });
                  });
                }
              });
          } else {
            // two possible positions for both dice
            [
              [d1, d2],
              [d2, d1],
            ].forEach((dice) => {
              detailledOutputs.push({
                dice,
                vapeurBonus,
                result,
              });
            });
          }
        });
    });
  });

  if (toxique !== null && Number.isInteger(toxique)) {
    // only for results with an actual wound (not "rien", "sonné", "tué net")
    // each result is splitted in 6, with an increase of the result depending on the success of toxique test
    detailledOutputs = detailledOutputs.flatMap((detailledOutput) =>
      [2, 3, 4].includes(detailledOutput.result)
        ? dice.map((toxiqueDice) => ({
            ...detailledOutput,
            result: Math.min(
              5,
              detailledOutput.result +
                (toxiqueDice > toxique ? 1 : 2) +
                Number(vulnerable) -
                Number(ethere)
            ) as woundResultsType,
          }))
        : detailledOutput
    );
  }

  // compile the (simplified) outputs from the detailledOutputs
  detailledOutputs.forEach(({ result }) => {
    outputResults[result]++;
  });

  return [outputResults, detailledOutputs];
};
