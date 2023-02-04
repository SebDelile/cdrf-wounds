import { dice, diceType } from '@/constants/dice';
import { woundIntensity } from '@/constants/woundIntensity';
import { woundResultsType } from '@/constants/woundResults';
import { woundTable, WoundTableType } from '@/constants/woundTable';
import { inputsType } from '@/types/inputsType';

export function setupWoundTable(inputs: inputsType): WoundTableType {
  const { immuJambes, immuTete } = inputs;
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
  return modifiedWoundTable;
}
