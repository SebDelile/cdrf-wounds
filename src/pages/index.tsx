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
                  type: TYPE_NUMBER,
                  value: inputs.RES,
                  name: 'RES',
                  label: 'RES',
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
        <Grid item xs={12} md={6}>
          <OutputsTable outputs={outputs} />
        </Grid>
      </Grid>
      <Footer isDebug={isDebug} setIsDebug={setIsDebug} />
    </>
  );
}
