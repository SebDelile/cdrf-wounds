import Grid from '@mui/material/Grid';
import { inputsType } from '@/types/inputsType';
import { outputsType } from '@/types/outputsType';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { computeResults } from '@/utils/computeResults';
import { initialResults } from '@/constants/woundResults';
import OutputsTable from '@/components/OutputsTable';
import Footer from '@/components/Footer';
import {
  TYPE_CHECKBOX,
  TYPE_CHECKBOX_AND_VALUE,
  TYPE_NUMBER,
} from '@/constants/inputsType';
import InputsGroup from '@/components/InputsGroup';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Paper } from '@mui/material';

export default function Home() {
  const [isDebug, setIsDebug] = useState(false);
  const [inputs, setInputs] = useState<inputsType>({
    FOR: 0,
    armeSacree: false,
    tirImmobile: false,
    fleau: false,
    feroce: false,
    epeeHache: false,
    vapeurFOR: false,
    toxique: null,
    //
    RES: 0,
    armureSacree: false,
    durACuire: false,
    ethere: false,
    vulnerable: false,
    immuJambes: false,
    immuTete: false,
    immuSonne: false,
  });

  const [outputs, setOutputs] = useState<outputsType>(initialResults);
  const [currentTab, setCurrentTab] = useState<number>(0);

  useEffect(() => {
    if (Number.isInteger(inputs.FOR) && Number.isInteger(inputs.RES)) {
      setOutputs(computeResults(inputs, isDebug));
    }
  }, [inputs, isDebug]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Grid
        container
        spacing={2}
        component={'main'}
        sx={{
          padding: '2rem',
        }}
      >
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item xs={6}>
            <InputsGroup
              groupDetails={[
                {
                  type: TYPE_NUMBER,
                  value: inputs.FOR,
                  name: 'FOR',
                  label: 'FOR',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.armeSacree,
                  name: 'armeSacree',
                  label: 'Arme Sacr??e',
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
                  label: 'Fl??au',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.feroce,
                  name: 'feroce',
                  label: 'F??roce',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.epeeHache,
                  name: 'epeeHache',
                  label: 'Ep??e-hache',
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
                  type: TYPE_NUMBER,
                  value: inputs.RES,
                  name: 'RES',
                  label: 'RES',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.armureSacree,
                  name: 'armureSacree',
                  label: 'Armure Sacr??e',
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
                  label: 'Dur ?? cuire',
                },

                {
                  type: TYPE_CHECKBOX,
                  value: inputs.ethere,
                  name: 'ethere',
                  label: 'Eth??r??',
                  impliedChanges: [['immuSonne', (newState) => newState]],
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.vulnerable,
                  name: 'vulnerable',
                  label: 'Vuln??rable',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.immuJambes,
                  name: 'immuJambes',
                  label: 'Immunit??/jambes',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.immuTete,
                  name: 'immuTete',
                  label: 'Immunit??/t??te',
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.immuSonne,
                  name: 'immuSonne',
                  label: 'Immunit??/Sonn??',
                  disabled: inputs.ethere,
                },
              ]}
              setInputs={setInputs}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={currentTab}
                onChange={(_, newValue) => setCurrentTab(newValue)}
              >
                <Tab label="Graph r??partition" />
                <Tab label="Graph cumul??" />
                <Tab label="Tableau" />
              </Tabs>
            </Box>
            {[
              <Box sx={{ p: 3 }} key={0}>
                tab 0
              </Box>,
              <Box sx={{ p: 3 }} key={1}>
                tab 1
              </Box>,
              <OutputsTable key={2} outputs={outputs} />,
            ].map((child, index) => (
              <div key={index} role="tabpanel" hidden={currentTab !== index}>
                {currentTab === index ? child : null}
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
      <Footer isDebug={isDebug} setIsDebug={setIsDebug} />
    </>
  );
}
