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
  if (immuJambes) {
    mapOverColumns([1], (_) => 0);
  }
  if (immuTete) {
    mapOverColumns([5, 6], (_) => 0);
  }

  // in case of multiple effect : opposite effects cancel themself and not possible to shift more than one wound level at the same time
  // so each cell can only be originalResult, originalResult+1 or originalResult-1
  if (epeeHache || feroce || ethere || vulnerable) {
    mapOverColumns([...dice], (originalResult) => {
      switch (originalResult) {
        case 1:
          return (originalResult +
            Number(feroce && !ethere)) as woundResultsType;
        case 2:
        case 3:
          return (originalResult +
            Number(vulnerable) -
            Number(ethere)) as woundResultsType;
        case 4:
          return (originalResult +
            Math.min(
              Number(vulnerable) + Number(epeeHache) - Number(ethere),
              1
            )) as woundResultsType;
        // both extrems are not affected, no risk to go outside of the possible results range
        case 0:
        case 5:
        default:
          return originalResult;
      }
    });
  }

  // replace all results "sonné" with "rien"
  if (immuSonne) {
    mapOverColumns([...dice], (originalResult) =>
      originalResult === 1 ? 0 : originalResult
    );
  }

  return modifiedWoundTable;
}
