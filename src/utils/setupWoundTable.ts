import { dice, diceType } from '@/constants/dice';
import { woundIntensity } from '@/constants/woundIntensity';
import { woundResultsType } from '@/constants/woundResults';
import { woundTable, WoundTableType } from '@/constants/woundTable';
import { inputsType } from '@/constants/inputs';

// for ease of calculation, some of the effect are applied directly to the woundTable before calculation
export function setupWoundTable(inputs: inputsType): WoundTableType {
  const {
    immuJambes,
    immuTete,
    immuSonne,
    epeeHache,
    feroce,
    ethere,
    vulnerable,
  } = inputs;
  // deep duplicate the initial table
  const modifiedWoundTable = Object.fromEntries(
    dice.map((i: diceType) => [i, { ...woundTable[i] }])
  ) as WoundTableType;
  // apply a callback to modify each cell of the columns
  function mapOverColumns(
    columns: diceType[],
    callback: (arg0: woundResultsType) => woundResultsType
  ) {
    columns.forEach((column) => {
      woundIntensity.forEach((intensity) => {
        modifiedWoundTable[column][intensity] = callback(
          modifiedWoundTable[column][intensity]
        );
      });
    });
  }

  // replace all results with "rien" in these wound localizations
  if (immuJambes) mapOverColumns([1], () => 0);
  if (immuTete) mapOverColumns([5, 6], () => 0);

  mapOverColumns([...dice], (originalResult) => {
    let newResult = originalResult;
    if (feroce && newResult === 1) newResult = 2;
    if (epeeHache && newResult === 4) newResult = 5;
    if (ethere || (vulnerable && [2, 3, 4].includes(newResult)))
      newResult += Number(vulnerable) - Number(ethere);
    // at the end because it's not really a replacement, just that "sonné" has no effect for fighter with immu/sonné
    if (immuSonne && newResult === 1) newResult = 0;

    return newResult as woundResultsType;
  });

  return modifiedWoundTable;
}
