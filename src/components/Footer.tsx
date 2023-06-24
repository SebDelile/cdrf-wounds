import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { ExplanationDialog } from './ExplanationDialog';
import Image from 'next/image';
import logoCDRF from 'public/logo-transparent.png';

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
        <Image src={logoCDRF} width={36} height={36} alt="logo CDRF" />
      </Box>
    </Box>
  );
}
