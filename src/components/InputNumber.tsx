import TextField from '@mui/material/TextField';
import { inputsType } from '@/constants/inputs';
import { inputDisabledType } from '@/constants/inputsInfo';

type propTypes = {
  name: keyof inputsType;
  label: string;
  disabled?: inputDisabledType;
  range?: [number, number];
  inputs: inputsType;
  setInputs: (arg0: (prevState: inputsType) => inputsType) => void;
};

export default function InputNumber({
  name,
  label,
  disabled,
  range,
  inputs,
  setInputs,
}: propTypes) {
  const value = inputs[name] as number | undefined;
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
      disabled={disabled?.some(([field, callback]) => callback(inputs[field]))}
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
