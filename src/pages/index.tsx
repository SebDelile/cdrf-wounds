import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { inputsType } from '@/types/inputsType';
import { outputsType } from '@/types/outputsType';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { computeResults } from '@/utils/computeResults';
import { initialResults } from '@/constants/initialResults';
import OutputsTable from '@/components/OutputsTable';
import Footer from '@/components/Footer';

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
  });

  const [outputs, setOutputs] = useState<outputsType>(initialResults);

  useEffect(() => {
    if (Number.isInteger(inputs.FOR) && Number.isInteger(inputs.RES)) {
      setOutputs(computeResults(inputs, isDebug));
    }
  }, [inputs, isDebug]);

  const handleToggleBoolean = (field: keyof inputsType) => {
    setInputs((state) => ({
      ...state,
      [field]: !state[field],
    }));
  };

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
            <Grid
              container
              direction="column"
              component={Paper}
              sx={{ padding: '1rem' }}
            >
              <Grid item>
                <TextField
                  id="input-for"
                  label="FOR"
                  type="number"
                  value={inputs.FOR}
                  onChange={(event) => {
                    setInputs((state) => ({
                      ...state,
                      FOR: parseInt(event.target.value),
                    }));
                  }}
                  error={!Number.isInteger(inputs.FOR)}
                  helperText={
                    !Number.isInteger(inputs.FOR) ? 'FOR est obligatoire' : null
                  }
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inputs.armeSacree}
                      onChange={() => {
                        handleToggleBoolean('armeSacree');
                      }}
                    />
                  }
                  label="Arme sacrée"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inputs.tirImmobile}
                      onChange={() => {
                        handleToggleBoolean('tirImmobile');
                      }}
                    />
                  }
                  label="Tir immobile"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inputs.fleau}
                      onChange={() => {
                        handleToggleBoolean('fleau');
                      }}
                    />
                  }
                  label="Fleau"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              component={Paper}
              sx={{ padding: '1rem' }}
            >
              <Grid item>
                <TextField
                  id="input-res"
                  label="RES"
                  type="number"
                  value={inputs.RES}
                  onChange={(event) => {
                    setInputs((state) => ({
                      ...state,
                      RES: parseInt(event.target.value),
                    }));
                  }}
                  error={!Number.isInteger(inputs.RES)}
                  helperText={
                    !Number.isInteger(inputs.RES) ? 'RES est obligatoire' : null
                  }
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inputs.armureSacree}
                      onChange={() => {
                        handleToggleBoolean('armureSacree');
                      }}
                    />
                  }
                  label="Armure sacrée"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inputs.durACuire}
                      onChange={() => {
                        handleToggleBoolean('durACuire');
                      }}
                    />
                  }
                  label="Dur à cuire"
                />
              </Grid>
            </Grid>
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
