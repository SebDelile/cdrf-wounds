import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { red } from '@mui/material/colors';
import Tooltip from './InputTooltip';
import { inputsType } from '@/constants/inputs';
import { inputDisabledType } from '@/constants/inputsInfo';

type propTypes = {
  name: keyof inputsType;
  label: string;
  description: string;
  disabled?: inputDisabledType;
  range?: [number, number];
  inputs: inputsType;
  setInputs: (arg0: (prevState: inputsType) => inputsType) => void;
};

export default function InputCheckboxAndValue({
  name,
  label,
  description,
  disabled,
  range,
  inputs,
  setInputs,
}: propTypes) {
  const value = inputs[name] as null | number;
  return (
    <>
      <Tooltip title={description}>
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
          disabled={disabled?.some(([field, callback]) =>
            callback(inputs[field])
          )}
          sx={{
            color:
              // error display, as props error seems to be absent even if the doc say yes :(
              value !== null && !Number.isInteger(value)
                ? red[700]
                : 'inherits',
          }}
        />
      </Tooltip>
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
          disabled={disabled?.some(([field, callback]) =>
            callback(inputs[field])
          )}
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
