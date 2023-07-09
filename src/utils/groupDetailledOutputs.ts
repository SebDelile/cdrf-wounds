import { diceType } from '@/constants/dice';
import {
  detailledOutputType,
  groupedDetailledOutputType,
} from '@/constants/outputs';
import { woundResultsType } from '@/constants/woundResults';

type groupedByDiceAndResultType = {
  [key: string]: detailledOutputType[];
};

// group the detailled outputs with equal dice & result
// for example, if the same dice set with vapeurBonus equal to 1, 2 and 3 give the same results,
// it will be grouped within a single object with prop bonus = ["1-3"] and count = 3
export const groupDetailledOutputs = (
  detailledOutputs: detailledOutputType[],
  isVapeurBonus: boolean,
  toxique: null | 0 | diceType
): groupedDetailledOutputType[] => {
  const isToxique = toxique !== null;

  // early return because there is nothing to group
  if (!isToxique && !isVapeurBonus) return detailledOutputs;

  // group according to result (r) toxic worsening (t = 0, 1 or 2) and dice (d1, d2, d3?) like r-t-d1-d2-(d3?)
  const groupedByDiceAndResult: groupedByDiceAndResultType =
    detailledOutputs.reduce((acc, cur) => {
      const group = `${cur.result}-${
        isToxique && cur.bonus[1] ? (toxique >= cur.bonus[1] ? '2' : '1') : '0'
      }-${cur.dice.join('-')}`;
      return { ...acc, [group]: [...(acc[group] || []), cur] };
    }, {} as groupedByDiceAndResultType);

  // reformat in an array with grouped bonus
  return Object.entries(groupedByDiceAndResult).map(
    ([group, detailledOutputsFromGroup]) => {
      const [result, _toxic, ...dice] = group.split('-').map(Number);
      const bonus = [''];

      if (isVapeurBonus) {
        bonus[0] = concatBonusValues(0, detailledOutputsFromGroup);
      }
      if (isToxique) {
        const toxiqueBonus = concatBonusValues(1, detailledOutputsFromGroup);
        if (toxiqueBonus) bonus.push(toxiqueBonus);
      }

      return {
        dice: dice as diceType[],
        bonus,
        count: detailledOutputsFromGroup.length,
        result: result as woundResultsType,
      };
    }
  );
};

// returns "min-max" or "value" for single value
const concatBonusValues = (
  index: 0 | 1,
  data: detailledOutputType[]
): string => {
  if (!data[0].bonus[index]) return '';
  if (data.length === 1) return data[0].bonus[index].toString();

  data.sort((a, b) => a.bonus[index] - b.bonus[index]);
  return `${data[0].bonus[index]}-${data[data.length - 1].bonus[index]}`;
};
