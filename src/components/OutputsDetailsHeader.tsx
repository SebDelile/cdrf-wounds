import { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { woundResultsLabels, woundResultsType } from '@/constants/woundResults';
import { localisations } from '@/constants/woundTable';
import { filterType, filterOptionType } from './OutputsDetails';

type propTypes = {
  filter: filterType;
  setFilter: Dispatch<SetStateAction<filterType>>;
  filterOption: filterOptionType;
  setFilterOption: Dispatch<SetStateAction<filterOptionType>>;
  countIndication: string;
};

export default function OutputsDetailsHeader({
  filter,
  setFilter,
  filterOption,
  setFilterOption,
  countIndication,
}: propTypes) {
  return (
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
      <p>{countIndication}</p>
    </Box>
  );
}
