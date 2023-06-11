// the type possibilities for the inputs form

export const TYPE_NUMBER = 'number';
export const TYPE_CHECKBOX = 'checkbox';
export const TYPE_CHECKBOX_AND_VALUE = 'checkboxAndValue';

const InputElements = [
  TYPE_NUMBER,
  TYPE_CHECKBOX,
  TYPE_CHECKBOX_AND_VALUE,
] as const;

export type InputElementsType = (typeof InputElements)[number];
