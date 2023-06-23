import { useMemo, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';

import { initialInputs, inputsType } from '@/constants/inputs';
import { outputsType, detailledOutputsType } from '@/constants/outputs';
import OutputsTable from '@/components/OutputsTable';
import InputsGroup from '@/components/InputsGroup';
import BarChart from '@/components/BarChart';
import {
  getFormattedOutputsAsCumulativePercentage,
  getFormattedOutputsAsPercentage,
} from '@/utils/getFormattedOutputs';
import { computeResults } from '@/utils/computeResults';
import OutputsList from './OutputsList';

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
  const [outputs, detailledOutputs] = useMemo<
    [outputsType, detailledOutputsType]
  >(() => computeResults(inputs), [inputs]);

  const ResultContainerRef = useRef(null);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        position: 'relative',
      }}
      alignItems="stretch"
    >
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputsGroup
              fields={['FORmoinsRES', 'double6Tue']}
              inputs={inputs}
              setInputs={setInputs}
              row={true}
            />
          </Grid>
          <Grid item xs={6}>
            <InputsGroup
              fields={[
                'jetAmplifie',
                'armeSacree',
                'tirImmobile',
                'fleau',
                'feroce',
                'epeeHache',
                'vapeurFOR',
                'toxique',
              ]}
              inputs={inputs}
              setInputs={setInputs}
            />
          </Grid>
          <Grid item xs={6}>
            <InputsGroup
              fields={[
                'jetAttenue',
                'armureSacree',
                'durACuire',
                'ethere',
                'vulnerable',
                'immuJambes',
                'immuTete',
                'immuSonne',
              ]}
              inputs={inputs}
              setInputs={setInputs}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 0 }}>
            <Tabs
              value={currentTab}
              onChange={(_, newValue) => setCurrentTab(newValue)}
            >
              <Tab label="Graph" />
              <Tab label="Graph cumul" />
              <Tab label="Tableau" />
              <Tab label="Liste" />
            </Tabs>
          </Box>
          <Box
            role="tabpanel"
            ref={ResultContainerRef}
            sx={{
              flexGrow: 1,
              flexShrink: 1,
              overflow: 'hidden',
              height: { xs: '375px', md: 'unset' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
            }}
          >
            {[
              <BarChart
                key={0}
                data={getFormattedOutputsAsPercentage(outputs)}
                containerRef={ResultContainerRef}
              />,

              <BarChart
                key={1}
                data={getFormattedOutputsAsCumulativePercentage(outputs)}
                containerRef={ResultContainerRef}
                hideFirstValue={true}
              />,
              <OutputsTable key={2} outputs={outputs} />,
              <OutputsList
                key={3}
                detailledOutputs={detailledOutputs}
                containerRef={ResultContainerRef}
                isToxic={inputs.toxique !== null}
              />,
            ].map((child, index) => (currentTab === index ? child : null))}
          </Box>
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
