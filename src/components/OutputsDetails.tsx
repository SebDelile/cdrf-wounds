import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';

import {
  detailledOutputType,
  groupedDetailledOutputType,
} from '@/constants/outputs';
import { woundResultsType } from '@/constants/woundResults';
import { diceType } from '@/constants/dice';
import useResize from '@/utils/useResize';
import { concatDetailledOutput } from '@/utils/concatDetailledOutput';
import { groupDetailledOutputs } from '@/utils/groupDetailledOutputs';
import OutputsDetailsList from './OutputsDetailsList';
import OutputsDetailsHeader from './OutputsDetailsHeader';

type propTypes = {
  detailledOutputs: detailledOutputType[];
  containerRef: React.RefObject<Element>;
  isVapeurBonus: boolean;
  toxique: null | 0 | diceType;
};

export type orderType = 1 | -1;
export type fieldsType = 'dice' | 'result' | 'bonus';
export type filterType = 'Aucun' | 'Localisation' | 'Résultat';
export type filterOptionType = diceType | woundResultsType | 'Tout';

export default function OutputsDetails({
  detailledOutputs,
  containerRef,
  isVapeurBonus,
  toxique,
}: propTypes) {
  const [order, setOrder] = useState<orderType>(1);
  const [orderBy, setOrderBy] = useState<fieldsType>('dice');
  const [filter, setFilter] = useState<filterType>('Aucun');
  const [filterOption, setFilterOption] = useState<filterOptionType>('Tout');

  const [_, containerHeight] = useResize(containerRef);

  const rows: groupedDetailledOutputType[] = useMemo(
    () => groupDetailledOutputs(detailledOutputs, isVapeurBonus, toxique),
    [detailledOutputs, isVapeurBonus, toxique]
  );

  const displayedRows = useMemo(
    () =>
      rows
        .filter(({ dice, result }) => {
          if (filterOption === 'Tout') return true;
          switch (filter) {
            case 'Localisation': {
              const minDice = [...dice].sort()[0];
              return (
                filterOption === minDice ||
                (minDice === 6 && filterOption === 5)
              );
            }
            case 'Résultat':
              return filterOption === result;
            default:
              return true;
          }
        })
        .sort((a, b) => {
          const primaryOrderByResult =
            a[orderBy] > b[orderBy] ? 1 : a[orderBy] < b[orderBy] ? -1 : 0;
          // if there is equality, it's ordered according to dice>bonus>result

          return primaryOrderByResult
            ? order * primaryOrderByResult
            : order *
                (concatDetailledOutput(a) > concatDetailledOutput(b) ? 1 : -1);
        }),
    [rows, filter, filterOption, order, orderBy]
  );

  const displayedRowsCount = useMemo(
    () => displayedRows.reduce((a, b) => a + (b?.count ?? 1), 0),
    [displayedRows]
  );

  const countIndication = `(${displayedRowsCount} / ${detailledOutputs.length})`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        maxHeight: containerHeight,
      }}
    >
      <OutputsDetailsHeader
        filter={filter}
        setFilter={setFilter}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        countIndication={countIndication}
      />
      <OutputsDetailsList
        displayedRows={displayedRows}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        isVapeurBonus={isVapeurBonus}
        toxique={toxique}
      />
    </Box>
  );
}
