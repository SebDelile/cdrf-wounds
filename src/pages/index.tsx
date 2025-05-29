import { useState } from 'react';
import Head from 'next/head';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import WoundCalculator from '@/components/WoundCalculator';
import { SvgLinearGradient } from '@/components/SvgLinearGradient';

export default function Home() {
  const [calculators, setCalculators] = useState<number[]>([0]);

  const addCalculator = () => {
    const biggestCurrentId = calculators.reduce(
      (max, current) => (current > max ? current : max),
      0
    );
    setCalculators((prev) => [...prev, biggestCurrentId + 1]);
  };

  const removeCalculator = (removedId: number) => {
    setCalculators((prev) => prev.filter((id) => id !== removedId));
  };

  return (
    <Grid container spacing={4}>
      <SvgLinearGradient />
      {calculators.map((id) => (
        <Grid
          item
          key={id}
          xs={12}
          component={'section'}
          sx={{ position: 'relative' }}
        >
          <WoundCalculator
            id={id}
            removeCalculator={
              calculators.length > 1 ? removeCalculator : undefined
            }
          />
          <hr
            style={{
              position: 'absolute',
              left: '20%',
              bottom: '-26px',
              width: '60%',
              border: `solid ${grey[400]} 2px`,
            }}
          />
        </Grid>
      ))}
      <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => addCalculator()}
          sx={{ backgroundColor: 'white' }}
        >
          Ajouter un calculateur
        </Button>
      </Grid>
    </Grid>
  );
}
