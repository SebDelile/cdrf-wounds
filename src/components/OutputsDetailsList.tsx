import { Dispatch, SetStateAction } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import { groupedDetailledOutputType } from '@/constants/outputs';
import { woundResultsLabels } from '@/constants/woundResults';
import { diceType } from '@/constants/dice';
import { concatDetailledOutput } from '@/utils/concatDetailledOutput';
import { fieldsType, orderType } from './OutputsDetails';

type propTypes = {
  displayedRows: groupedDetailledOutputType[];
  order: orderType;
  setOrder: Dispatch<SetStateAction<orderType>>;
  orderBy: fieldsType;
  setOrderBy: Dispatch<SetStateAction<fieldsType>>;
  isVapeurBonus: boolean;
  toxique: null | 0 | diceType;
};

type columnsType = {
  field: fieldsType;
  headerName: string;
};

const COLUMNS: columnsType[] = [
  { field: 'dice', headerName: 'Dés' },
  { field: 'bonus', headerName: 'Bonus' },
  { field: 'result', headerName: 'Résultat' },
];

export default function OutputsDetailsList({
  displayedRows,
  order,
  setOrder,
  orderBy,
  setOrderBy,
  isVapeurBonus,
  toxique,
}: propTypes) {
  const isBonus = toxique !== null || isVapeurBonus;

  return (
    <TableContainer>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {COLUMNS.filter(({ field }) => field !== 'bonus' || isBonus).map(
              ({ field, headerName }) => (
                <TableCell
                  key={field}
                  sortDirection={
                    orderBy === field ? (order === -1 ? 'desc' : 'asc') : false
                  }
                >
                  <TableSortLabel
                    active={orderBy === field}
                    direction={
                      orderBy === field && order === -1 ? 'desc' : 'asc'
                    }
                    onClick={() => {
                      setOrder(orderBy === field && order === 1 ? -1 : 1);
                      setOrderBy(field);
                    }}
                  >
                    {headerName}
                  </TableSortLabel>
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.length ? (
            displayedRows.map(({ dice, bonus, result, count }) => {
              return (
                <TableRow key={concatDetailledOutput({ dice, bonus, result })}>
                  <TableCell>{dice.join('-')}</TableCell>
                  {isBonus && (
                    <TableCell>
                      {`${[
                        isVapeurBonus ? `vapeur ${bonus[0]}` : null,
                        toxique !== null && bonus[1]
                          ? `toxique ${bonus[1]}`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(' / ')}${
                        count && count > 1 ? ` (x${count})` : ''
                      }`}
                    </TableCell>
                  )}
                  <TableCell>{woundResultsLabels[result]}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={isBonus ? 3 : 2}>Aucun résultat</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
