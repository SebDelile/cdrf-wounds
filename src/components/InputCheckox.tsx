import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from './InputTooltip';
import { inputsType } from '@/constants/inputs';
import {
  inputDisabledType,
  inputImpliedChangesType,
} from '@/constants/inputsInfo';

type propTypes = {
  name: keyof inputsType;
  label: string;
  description: string;
  disabled?: inputDisabledType;
  inputs: inputsType;
  setInputs: (arg0: (prevState: inputsType) => inputsType) => void;
  impliedChanges?: inputImpliedChangesType;
};

export default function InputCheckbox({
  name,
  label,
  description,
  disabled,
  inputs,
  setInputs,
  impliedChanges,
}: propTypes) {
  return (
    <Tooltip title={description}>
      <FormControlLabel
        control={
          <Checkbox
            checked={inputs[name] as boolean}
            onChange={() => {
              setInputs((state) => {
                const newState = !state[name];
                return {
                  ...state,
                  [name]: newState,
                  ...(impliedChanges &&
                    Object.fromEntries(
                      impliedChanges.map(([field, callback]) => [
                        field,
                        callback(newState, state[field]),
                      ])
                    )),
                };
              });
            }}
          />
        }
        label={label}
        disabled={disabled?.some(([field, callback]) =>
          callback(inputs[field])
        )}
      />
    </Tooltip>
  );
}
