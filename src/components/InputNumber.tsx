import TextField from '@mui/material/TextField';
import { inputsType } from '@/constants/inputs';

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
  const isError = !Number.isInteger(value);
  return (
    <TextField
      id={`input-${name}`}
      label={label}
      type="number"
      value={isError ? '' : value}
      onChange={(event) => {
        setInputs((state) => ({
          ...state,
          [name]: parseInt(event.target.value),
        }));
      }}
      disabled={disabled}
      error={isError}
      helperText={isError ? 'Champ obligatoire' : null}
      inputProps={{
        ...(range && {
          min: range[0],
          max: range[1],
        }),
      }}
      sx={{
        width: '100%',
        maxWidth: '150px',
        '& .MuiFormHelperText-root': {
          position: 'absolute',
          bottom: 0,
        },
      }}
    />
  );
}
