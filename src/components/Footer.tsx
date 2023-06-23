import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';

type propTypes = {};

export default function Footer({}: propTypes) {
  return (
    <Box component="footer">
      <Box
        sx={{
          paddingTop: '1rem',
          borderTopColor: grey[400],
          borderWidth: 2,
          borderTopStyle: 'solid',
        }}
      >
        yolo
      </Box>
    </Box>
  );
}
