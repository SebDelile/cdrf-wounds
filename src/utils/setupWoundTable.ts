import { dice, diceType } from '@/constants/dice';
import { woundIntensity } from '@/constants/woundIntensity';
import { woundResultsType } from '@/constants/woundResults';
import { woundTable, WoundTableType } from '@/constants/woundTable';
import { inputsType } from '@/types/inputsType';

export function setupWoundTable(inputs: inputsType): WoundTableType {
  const { immuJambes, immuTete, epeeHache, feroce, ethere, vulnerable } =
    inputs;
  const modifiedWoundTable = Object.fromEntries(
    dice.map((i: diceType) => [i, { ...woundTable[i] }])
  ) as WoundTableType;
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

  if (immuJambes) {
    mapOverColumns([1], (_) => 0);
  }
  if (immuTete) {
    mapOverColumns([5, 6], (_) => 0);
  }

  if (epeeHache || feroce || ethere || vulnerable) {
    mapOverColumns([...dice], (prevResult) => {
      switch (prevResult) {
        case 1:
          return (prevResult + Number(feroce && !ethere)) as woundResultsType;
        case 2:
        case 3:
          return (prevResult +
            Number(vulnerable) -
            Number(ethere)) as woundResultsType;
        case 4:
          return (prevResult +
            Math.min(
              Number(vulnerable) + Number(epeeHache) - Number(ethere),
              1
            )) as woundResultsType;
        case 0:
        case 5:
        default:
          return prevResult;
      }
    });
  }
  return modifiedWoundTable;
}
