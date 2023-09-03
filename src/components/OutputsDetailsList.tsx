import { Dispatch, SetStateAction, forwardRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
// see example implementation at https://mui.com/material-ui/react-table/#virtualized-table
import { TableVirtuoso, TableComponents } from 'react-virtuoso';

import { groupedDetailledOutputType } from '@/constants/outputs';
import { woundResultsLabels } from '@/constants/woundResults';
import { diceType } from '@/constants/dice';
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

const VirtuosoTableComponents: TableComponents<groupedDetailledOutputType> = {
  Scroller: forwardRef<HTMLDivElement>(function scrollerComponent(props, ref) {
    return <TableContainer {...props} ref={ref} />;
  }),
  Table: (props) => <Table {...props} size="small" stickyHeader />,
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: forwardRef<HTMLTableSectionElement>(function TableBodycomponent(
    props,
    ref
  ) {
    return <TableBody {...props} ref={ref} />;
  }),
};

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

  function fixedHeaderContent() {
    return (
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
                direction={orderBy === field && order === -1 ? 'desc' : 'asc'}
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
    );
  }

  function rowContent(
    _index: number,
    { dice, bonus, result, count }: groupedDetailledOutputType
  ) {
    return (
      <>
        <TableCell>{dice.join('-')}</TableCell>
        {isBonus && (
          <TableCell>
            {`${[
              isVapeurBonus ? `vapeur ${bonus[0]}` : null,
              toxique !== null && bonus[1] ? `toxique ${bonus[1]}` : null,
            ]
              .filter(Boolean)
              .join(' / ')}${count && count > 1 ? ` (x${count})` : ''}`}
          </TableCell>
        )}
        <TableCell>{woundResultsLabels[result]}</TableCell>
      </>
    );
  }

  return (
    <TableVirtuoso
      data={displayedRows}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={rowContent}
      style={{ flexGrow: 1, width: '100%' }}
    />
  );
}
