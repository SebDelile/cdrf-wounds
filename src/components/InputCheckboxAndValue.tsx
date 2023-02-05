import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { inputsType } from '@/types/inputsType';
import { inherits } from 'util';

type propTypes = {
  value?: null | number;
  name: keyof inputsType;
  label: string;
  disabled?: boolean;
  range?: [number, number];
  setInputs: (arg0: (prevState: inputsType) => inputsType) => void;
};

export default function InputCheckboxWithValue({
  value,
  name,
  label,
  disabled,
  range,
  setInputs,
}: propTypes) {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={value !== null}
            onChange={() => {
              setInputs((state) => {
                const newState = state[name] === null ? 0 : null;
                return {
                  ...state,
                  [name]: newState,
                };
              });
            }}
          />
        }
        label={label}
        disabled={disabled}
        sx={{
          color:
            // error display, as props error seems to be absent even if the doc say yes :(
            value !== null && !Number.isInteger(value) ? '#D32F2F' : 'inherits',
        }}
      />
      {value !== null ? (
        <TextField
          id={`input-${name}`}
          type="number"
          value={value}
          onChange={(event) => {
            setInputs((state) => ({
              ...state,
              [name]: parseInt(event.target.value),
            }));
          }}
          disabled={disabled}
          error={!Number.isInteger(value)}
          inputProps={{
            ...(range && {
              min: range[0],
              max: range[1],
            }),
          }}
          size="small"
        />
      ) : null}
    </>
  );
}
