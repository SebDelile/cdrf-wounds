import { useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';

import { initialInputs, inputsType } from '@/constants/inputs';
import { outputsType } from '@/constants/outputs';
import {
  TYPE_CHECKBOX,
  TYPE_CHECKBOX_AND_VALUE,
  TYPE_NUMBER,
} from '@/constants/InputElements';
import OutputsTable from '@/components/OutputsTable';
import InputsGroup from '@/components/InputsGroup';
import BarChart from '@/components/BarChart';
import {
  getFormattedOutputsAsCumulativePercentage,
  getFormattedOutputsAsPercentage,
} from '@/utils/getFormattedOutputs';
import { computeResults } from '@/utils/computeResults';

type propTypes = {
  id: number;
  removeCalculator?: (id: number) => void;
};

export default function WoundCalculator({ id, removeCalculator }: propTypes) {
  // inputs is the state of the form
  const [inputs, setInputs] = useState<inputsType>(initialInputs);
  //if true, it log detailled results
  // the selected tab to display the results
  const [currentTab, setCurrentTab] = useState<number>(0);

  // all the results, recalculated each time inputs is changed
  // better use useMemo over useState/useEffect to avoid 2 renders instead of one
  // second parameter is isDebug flag (to log the detailled results)
  const outputs = useMemo<outputsType>(
    () => computeResults(inputs, false),
    [inputs]
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{
        position: 'relative',
      }}
      alignItems="stretch"
    >
      <Grid item xs={12} md={6} spacing={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} spacing={0}>
            <InputsGroup
              groupDetails={[
                {
                  type: TYPE_NUMBER,
                  value: inputs.FORmoinsRES,
                  name: 'FORmoinsRES',
                  label: 'FOR moins RES',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.double6Tue,
                  name: 'double6Tue',
                  label: '6-6 = Tué net',
                },
              ]}
              setInputs={setInputs}
              row={true}
            />
          </Grid>
          <Grid item xs={6} spacing={0}>
            <InputsGroup
              groupDetails={[
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.jetAmplifie,
                  name: 'jetAmplifie',
                  label: 'Jet Amplifié',
                  disabled: inputs.jetAttenue,
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.armeSacree,
                  name: 'armeSacree',
                  label: 'Arme Sacrée',
                  disabled: inputs.armureSacree,
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.tirImmobile,
                  name: 'tirImmobile',
                  label: 'Tir immobile',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.fleau,
                  name: 'fleau',
                  label: 'Fléau',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.feroce,
                  name: 'feroce',
                  label: 'Féroce',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.epeeHache,
                  name: 'epeeHache',
                  label: 'Epée-hache',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.vapeurFOR,
                  name: 'vapeurFOR',
                  label: 'Vapeur/FOR',
                },
                {
                  type: TYPE_CHECKBOX_AND_VALUE,
                  value: inputs.toxique,
                  name: 'toxique',
                  label: 'Toxique/X',
                  range: [0, 6],
                },
              ]}
              setInputs={setInputs}
            />
          </Grid>
          <Grid item xs={6}>
            <InputsGroup
              groupDetails={[
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.jetAttenue,
                  name: 'jetAttenue',
                  label: 'Jet Atténué',
                  disabled: inputs.jetAmplifie,
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.armureSacree,
                  name: 'armureSacree',
                  label: 'Armure Sacrée',
                  impliedChanges: [
                    [
                      'armeSacree',
                      (newState, prevFieldState) =>
                        newState ? false : prevFieldState,
                    ],
                  ],
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.durACuire,
                  name: 'durACuire',
                  label: 'Dur à cuire',
                },

                {
                  type: TYPE_CHECKBOX,
                  value: inputs.ethere,
                  name: 'ethere',
                  label: 'Ethéré',
                  impliedChanges: [['immuSonne', (newState) => newState]],
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.vulnerable,
                  name: 'vulnerable',
                  label: 'Vulnérable',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.immuJambes,
                  name: 'immuJambes',
                  label: 'Immunité/jambes',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.immuTete,
                  name: 'immuTete',
                  label: 'Immunité/tête',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.immuSonne,
                  name: 'immuSonne',
                  label: 'Immunité/Sonné',
                  disabled: inputs.ethere,
                },
              ]}
              setInputs={setInputs}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ height: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={currentTab}
              onChange={(_, newValue) => setCurrentTab(newValue)}
            >
              <Tab label="Graph proportion" />
              <Tab label="Graph proportion cumulée" />
              <Tab label="Tableau" />
            </Tabs>
          </Box>
          {[
            <Box
              sx={{ p: 3, display: 'flex', justifyContent: 'center' }}
              key={0}
            >
              <BarChart data={getFormattedOutputsAsPercentage(outputs)} />
            </Box>,
            <Box
              sx={{ p: 3, display: 'flex', justifyContent: 'center' }}
              key={0}
            >
              <BarChart
                data={getFormattedOutputsAsCumulativePercentage(outputs)}
                hideFirstValue={true}
              />
            </Box>,
            <OutputsTable key={2} outputs={outputs} />,
          ].map((child, index) => (
            <div key={index} role="tabpanel" hidden={currentTab !== index}>
              {currentTab === index ? child : null}
            </div>
          ))}
        </Paper>
      </Grid>
      {typeof removeCalculator === 'function' && (
        <IconButton
          sx={{
            position: 'absolute',
            top: '1rem',
            right: 0,
            minWidth: '3rem',
            borderRadius: '4px',
          }}
          onClick={() => removeCalculator(id)}
          title="retirer le calculateur"
        >
          <CloseIcon />
        </IconButton>
      )}
    </Grid>
  );
}
