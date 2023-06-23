import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { inputsType } from '@/constants/inputs';
import {
  TYPE_CHECKBOX,
  TYPE_CHECKBOX_AND_VALUE,
  TYPE_NUMBER,
} from '@/constants/inputElements';
import { INPUTS_INFO, inputsInfoType } from '@/constants/inputsInfo';
import InputNumber from './InputNumber';
import InputCheckbox from './InputCheckox';
import InputCheckboxAndValue from './InputCheckboxAndValue';

type propTypes = {
  fields: (keyof inputsInfoType)[];
  inputs: inputsType;
  setInputs: (arg0: (prevState: inputsType) => inputsType) => void;
  row?: boolean;
};

export default function InputsGroup({
  fields,
  inputs,
  setInputs,
  row,
}: propTypes) {
  return (
    <Grid
      container
      component={Paper}
      sx={{ padding: '1rem', columnGap: '1rem' }}
      {...(row ? { alignItems: 'center' } : { direction: 'column' })}
    >
      {fields.map((field) => {
        const inputInfo = INPUTS_INFO[field];
        return (
          <Grid item key={field}>
            {inputInfo.type === TYPE_NUMBER ? (
              <InputNumber
                name={field}
                {...inputInfo}
                inputs={inputs}
                setInputs={setInputs}
              />
            ) : inputInfo.type === TYPE_CHECKBOX ? (
              <InputCheckbox
                name={field}
                {...inputInfo}
                inputs={inputs}
                setInputs={setInputs}
              />
            ) : inputInfo.type === TYPE_CHECKBOX_AND_VALUE ? (
              <InputCheckboxAndValue
                name={field}
                {...inputInfo}
                inputs={inputs}
                setInputs={setInputs}
              />
            ) : null}
          </Grid>
        );
      })}
    </Grid>
  );
}
