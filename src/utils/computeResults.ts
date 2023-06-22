import { dice, diceType } from '@/constants/dice';
import { inputsType } from '@/constants/inputs';
import {
  outputsType,
  detailledOutputsType,
  initialOutputs,
} from '@/constants/outputs';
import { woundIntensityType } from '@/constants/woundIntensity';
import { readWoundTable } from './readWoundTable';
import { setupWoundTable } from './setupWoundTable';
import { formatDetailledOutput } from './formatDetailledOutput';

export const computeResults = (
  inputs: inputsType
): [outputsType, detailledOutputsType] => {
  //initialize
  const outputResults = [...initialOutputs] as outputsType;
  const detailledOutputs: detailledOutputsType = [];
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
      outputResults[result]++;
      detailledOutputs.push(
        formatDetailledOutput({
          dice: has3dice ? [d1, d1, d1] : [d1, d1],
          vapeurBonus,
          result,
        })
      );
      // handle other doubles for 3 dice rolls (only double with the 2 dice being used)
      if (has3dice) {
        dice
          .filter((d3) => (jetAttenue ? d3 > d1 : d3 < d1))
          .forEach((d3) => {
            outputResults[result] += 3;
            [
              [d1, d1, d3],
              [d1, d3, d1],
              [d3, d1, d1],
            ].forEach((dice) => {
              detailledOutputs.push(
                formatDetailledOutput({
                  dice,
                  vapeurBonus,
                  result,
                })
              );
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
                outputResults[result] += 3;
                [
                  [d1, d2, d3],
                  [d2, d1, d3],
                  [d2, d3, d1],
                ].forEach((dice) => {
                  detailledOutputs.push(
                    formatDetailledOutput({
                      dice,
                      vapeurBonus,
                      result,
                    })
                  );
                });

                // three more possibilities if all three dice are different
                if (d2 !== d3) {
                  outputResults[result] += 3;
                  [
                    [d1, d3, d2],
                    [d3, d1, d2],
                    [d3, d2, d1],
                  ].forEach((dice) => {
                    detailledOutputs.push(
                      formatDetailledOutput({
                        dice,
                        vapeurBonus,
                        result,
                      })
                    );
                  });
                }
              });
          } else {
            // two possible positions for both dice
            outputResults[result] += 2;
            [
              [d1, d2],
              [d2, d1],
            ].forEach((dice) => {
              detailledOutputs.push(
                formatDetailledOutput({
                  dice,
                  vapeurBonus,
                  result,
                })
              );
            });
          }
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
        (1 - toxique / 6) * outputResults[i], // toxic test failed
      ],
      [
        Math.min(2 + i + Number(vulnerable) - Number(ethere), 5),
        (toxique / 6) * outputResults[i], //toxic test successed
      ],
    ]);
    // all the results are collapsed to give back the outputResults array
    [2, 3, 4, 5].forEach((i) => {
      outputResults[i] = woundsAfterToxic.reduce(
        (acc, cur) => (cur[0] === i ? acc + cur[1] : acc),
        0
      );
    });
  }

  return [outputResults, detailledOutputs];
};
