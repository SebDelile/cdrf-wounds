import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { ExplanationDialog } from './ExplanationDialog';
import Image from 'next/image';
import logoCDRF from 'public/logo-transparent.png';
import { Typography } from '@mui/material';

const version = process.env.NEXT_PUBLIC_APP_VERSION;

type propTypes = {};

export default function Header({}: propTypes) {
  return (
    <Box component="header">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '1rem',
          borderBottomColor: grey[400],
          borderWidth: 2,
          borderBottomStyle: 'solid',
        }}
      >
        <Typography variant="h6" component="h1">
          Calculateur de jet de blessure Confédé
        </Typography>
      </Box>
    </Box>
  );
}
