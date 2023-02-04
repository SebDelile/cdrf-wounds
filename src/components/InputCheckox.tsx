import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { inputsType } from '@/types/inputsType';

type propTypes = {
  value: boolean;
  name: keyof inputsType;
  label: string;
  disabled?: boolean;
  setInputs: (arg0: (prevState: inputsType) => inputsType) => void;
};

export default function InputCheckbox({
  value,
  name,
  label,
  disabled,
  setInputs,
}: propTypes) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={() => {
            setInputs((state) => ({
              ...state,
              [name]: !state[name],
            }));
          }}
        />
      }
      label={label}
      disabled={disabled}
    />
  );
}
