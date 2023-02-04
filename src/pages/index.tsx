import Grid from '@mui/material/Grid';
import { inputsType } from '@/types/inputsType';
import { outputsType } from '@/types/outputsType';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { computeResults } from '@/utils/computeResults';
import { initialResults } from '@/constants/woundResults';
import OutputsTable from '@/components/OutputsTable';
import Footer from '@/components/Footer';
import { TYPE_CHECKBOX, TYPE_NUMBER } from '@/constants/inputsType';
import InputsGroup from '@/components/InputsGroup';

export default function Home() {
  const [isDebug, setIsDebug] = useState(false);
  const [inputs, setInputs] = useState<inputsType>({
    FOR: 0,
    armeSacree: false,
    tirImmobile: false,
    fleau: false,
    //
    RES: 0,
    armureSacree: false,
    durACuire: false,
    immuJambes: false,
    immuTete: false,
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
                },
                {
                  type: TYPE_CHECKBOX,
                  value: inputs.durACuire,
                  name: 'durACuire',
                  label: 'Dur à cuire',
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
