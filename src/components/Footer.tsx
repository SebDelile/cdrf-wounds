import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { ExplanationDialog } from './ExplanationDialog';
import Image from 'next/image';
import logoCDRF from 'public/logo-transparent.png';
import { Typography } from '@mui/material';

const version = process.env.NEXT_PUBLIC_APP_VERSION;

type propTypes = {};

export default function Footer({}: propTypes) {
  return (
    <Box component="footer">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1rem',
          borderTopColor: grey[400],
          borderWidth: 2,
          borderTopStyle: 'solid',
        }}
      >
        <ExplanationDialog />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Typography variant="caption">
            {process.env.NODE_ENV === 'development'
              ? 'dev mode'
              : `version ${version}`}
          </Typography>
          <Image src={logoCDRF} width={36} height={36} alt="logo CDRF" />
        </Box>
      </Box>
    </Box>
  );
}
