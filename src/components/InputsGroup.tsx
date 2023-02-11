import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { inputsType } from '@/types/inputsType';
import {
  inputsTypeType,
  TYPE_CHECKBOX,
  TYPE_CHECKBOX_AND_VALUE,
  TYPE_NUMBER,
} from '@/constants/inputsType';
import InputNumber from './InputNumber';
import InputCheckbox from './InputCheckox';
import InputCheckboxAndValue from './InputCheckboxAndValue';

type propTypes = {
  groupDetails: groupDetailsType[];
  setInputs: (arg0: (prevState: inputsType) => inputsType) => void;
};

type groupDetailsType<type = inputsTypeType> =
  (type extends typeof TYPE_CHECKBOX
    ? {
        type: typeof TYPE_CHECKBOX;
        value: boolean;
      }
    : type extends typeof TYPE_NUMBER
    ? {
        type: typeof TYPE_NUMBER;
        value?: number;
      }
    : {
        type: typeof TYPE_CHECKBOX_AND_VALUE;
        value?: null | number;
      }) & {
    name: keyof inputsType;
    label: string;
    disabled?: boolean;
    impliedChanges?: [
      keyof inputsType,
      (
        currentfield: boolean,
        impliedField: null | boolean | number
      ) => null | boolean | number
    ][];
    range?: [number, number];
  };

export default function InputsGroup({ setInputs, groupDetails }: propTypes) {
  return (
    <Grid
      container
      direction="column"
      component={Paper}
      sx={{ padding: '1rem' }}
    >
      {groupDetails.map(
        ({ type, name, value, label, disabled, impliedChanges, range }) => (
          <Grid item key={name}>
            {type === TYPE_NUMBER ? (
              <InputNumber
                name={name}
                value={value}
                label={label}
                disabled={disabled}
                setInputs={setInputs}
                range={range}
              />
            ) : type === TYPE_CHECKBOX ? (
              <InputCheckbox
                name={name}
                value={value}
                label={label}
                disabled={disabled}
                setInputs={setInputs}
                impliedChanges={impliedChanges}
              />
            ) : type === TYPE_CHECKBOX_AND_VALUE ? (
              <InputCheckboxAndValue
                name={name}
                value={value}
                label={label}
                disabled={disabled}
                setInputs={setInputs}
                range={range}
              />
            ) : null}
          </Grid>
        )
      )}
    </Grid>
  );
}
