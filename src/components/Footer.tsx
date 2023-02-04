import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';

type propTypes = {
  isDebug: boolean;
  setIsDebug: (arg0: (prevState: boolean) => boolean) => void;
};

export default function Footer({ isDebug, setIsDebug }: propTypes) {
  return (
    <Box component="footer" sx={{ padding: '2rem' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isDebug}
            onChange={() => {
              setIsDebug((state) => !state);
            }}
          />
        }
        label="Debug"
      />
    </Box>
  );
}
