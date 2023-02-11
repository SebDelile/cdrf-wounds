import TextField from '@mui/material/TextField';
import { inputsType } from '@/types/inputsType';

type propTypes = {
  value?: number;
  name: keyof inputsType;
  label: string;
  disabled?: boolean;
  range?: [number, number];
  setInputs: (arg0: (prevState: inputsType) => inputsType) => void;
};

export default function InputNumber({
  value,
  name,
  label,
  disabled,
  range,
  setInputs,
}: propTypes) {
  return (
    <TextField
      id={`input-${name}`}
      label={label}
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
      helperText={!Number.isInteger(value) ? `${label} est obligatoire` : null}
      inputProps={{
        ...(range && {
          min: range[0],
          max: range[1],
        }),
      }}
      sx={{ width: '100%', maxWidth: '150px' }}
    />
  );
}
