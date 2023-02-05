import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { inputsType } from '@/types/inputsType';

type propTypes = {
  value: boolean;
  name: keyof inputsType;
  label: string;
  disabled?: boolean;
  setInputs: (arg0: (prevState: inputsType) => inputsType) => void;
  impliedChanges?: [
    keyof inputsType,
    (currentfield: boolean, impliedField: boolean | number) => boolean | number
  ][];
};

export default function InputCheckbox({
  value,
  name,
  label,
  disabled,
  setInputs,
  impliedChanges,
}: propTypes) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
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
      disabled={disabled}
    />
  );
}
