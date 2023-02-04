import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { inputsType } from '@/types/inputsType';
import { TYPE_CHECKBOX, TYPE_NUMBER } from '@/constants/inputsType';
import InputNumber from './InputNumber';
import InputCheckbox from './InputCheckox';

type propTypes = {
  groupDetails: groupDetailsType[];
  setInputs: (arg0: (prevState: inputsType) => inputsType) => void;
};

type groupDetailsType<type = typeof TYPE_CHECKBOX | typeof TYPE_NUMBER> =
  (type extends typeof TYPE_CHECKBOX
    ? {
        type: typeof TYPE_CHECKBOX;
        value: boolean;
      }
    : {
        type: typeof TYPE_NUMBER;
        value?: number;
      }) & { name: keyof inputsType; label: string; disabled?: boolean };

export default function InputsGroup({ setInputs, groupDetails }: propTypes) {
  return (
    <Grid
      container
      direction="column"
      component={Paper}
      sx={{ padding: '1rem' }}
    >
      {groupDetails.map(({ type, name, value, label, disabled }) => (
        <Grid item key={name}>
          {type === TYPE_NUMBER ? (
            <InputNumber
              name={name}
              value={value}
              label={label}
              disabled={disabled}
              setInputs={setInputs}
            />
          ) : type === TYPE_CHECKBOX ? (
            <InputCheckbox
              name={name}
              value={value}
              label={label}
              disabled={disabled}
              setInputs={setInputs}
            />
          ) : null}
        </Grid>
      ))}
    </Grid>
  );
}
