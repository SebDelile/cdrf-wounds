export const TYPE_NUMBER = 'number';
export const TYPE_CHECKBOX = 'checkbox';
export const TYPE_CHECKBOX_AND_VALUE = 'checkboxAndValue';

const inputsType = [
  TYPE_NUMBER,
  TYPE_CHECKBOX,
  TYPE_CHECKBOX_AND_VALUE,
] as const;
export type inputsTypeType = (typeof inputsType)[number];
