import { useState, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WarningIcon from '@mui/icons-material/Warning';

import { detailledOutputType } from '@/constants/outputs';
import { woundResultsLabels, woundResultsType } from '@/constants/woundResults';
import { diceType } from '@/constants/dice';
import { localisations } from '@/constants/woundTable';
import useResize from '@/utils/useResize';
import { concatDetailledOutput } from '@/utils/concatDetailledOutput';

type propTypes = {
  detailledOutputs: detailledOutputType[];
  containerRef: React.RefObject<Element>;
  isVapeurBonus: boolean;
  isToxic: boolean;
};

type fieldsType = 'dice' | 'result' | 'vapeurBonus';
type columnsType = {
  field: fieldsType;
  headerName: string;
};
type filterType = 'Aucun' | 'Localisation' | 'Résultat';
type filterOptionType = diceType | woundResultsType | 'Tout';

export default function OutputsList({
  detailledOutputs,
  containerRef,
  isVapeurBonus,
  isToxic,
}: propTypes) {
  const [order, setOrder] = useState<1 | -1>(1);
  const [orderBy, setOrderBy] = useState<fieldsType>('dice');
  const [filter, setFilter] = useState<filterType>('Aucun');
  const [filterOption, setFilterOption] = useState<filterOptionType>('Tout');

  const [_, containerHeight] = useResize(containerRef);

  const rows: detailledOutputType[] = useMemo(
    () =>
      [...detailledOutputs]
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
          // if there is equality, it's ordered according to dice>vapeurBonus>result

          return primaryOrderByResult
            ? order * primaryOrderByResult
            : order *
                (concatDetailledOutput(a) > concatDetailledOutput(b) ? 1 : -1);
        }),
    [detailledOutputs, filter, filterOption, order, orderBy]
  );

  const columns: columnsType[] = [
    { field: 'dice', headerName: 'Dés' },
    { field: 'vapeurBonus', headerName: 'Bonus' },
    { field: 'result', headerName: 'Résultat' },
  ];

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '0.5rem',
          mt: 1,
          ml: 1,
        }}
      >
        <FormControl sx={{ width: 150 }} size="small">
          <InputLabel id="select-filter-label">Filtre</InputLabel>
          <Select
            fullWidth
            labelId="select-filter-label"
            id="select-filter"
            value={filter}
            label="Filtre"
            onChange={(e) => {
              setFilterOption('Tout');
              setFilter(e.target.value as filterType);
            }}
          >
            <MenuItem value={'Aucun'}>Aucun</MenuItem>
            <MenuItem value={'Localisation'}>Localisation</MenuItem>
            <MenuItem value={'Résultat'}>Résultat</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 150 }} size="small">
          <InputLabel id="select-filter-options-label">Valeur</InputLabel>
          <Select
            fullWidth
            labelId="select-filter-options-label"
            id="select-filter-options"
            value={filterOption}
            disabled={filter === 'Aucun'}
            label="Valeur"
            onChange={(e) => {
              setFilterOption(e.target.value as filterOptionType);
            }}
            sx={{ textTransform: 'capitalize' }}
          >
            <MenuItem value={'Tout'}>Tout</MenuItem>
            {filter === 'Localisation'
              ? localisations.map((localisation, index) => (
                  <MenuItem
                    key={localisation}
                    value={index + 1}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {localisation}
                  </MenuItem>
                ))
              : filter === 'Résultat'
              ? woundResultsLabels.map((label, index) => (
                  <MenuItem
                    key={label}
                    value={index}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {label}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
        <p>{`(${rows.length} / ${detailledOutputs.length})`}</p>
        {isToxic ? (
          <WarningIcon
            color="action"
            titleAccess="Toxique/X n'est pas pris en compte dans les résultats affichés ci-dessous"
          />
        ) : null}
      </Box>
      <TableContainer>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {columns
                .filter(({ field }) => field !== 'vapeurBonus' || isVapeurBonus)
                .map(({ field, headerName }) => (
                  <TableCell
                    key={field}
                    sortDirection={
                      orderBy === field
                        ? order === -1
                          ? 'desc'
                          : 'asc'
                        : false
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
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? (
              rows.map(({ dice, vapeurBonus, result }) => {
                return (
                  <TableRow
                    key={concatDetailledOutput({ dice, vapeurBonus, result })}
                  >
                    <TableCell>{dice.join('-')}</TableCell>
                    {isVapeurBonus && (
                      <TableCell>{`vapeur ${vapeurBonus}`}</TableCell>
                    )}
                    <TableCell>{woundResultsLabels[result]}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={isVapeurBonus ? 3 : 2}>
                  Aucun résultat
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
