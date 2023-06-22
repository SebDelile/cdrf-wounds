// the type possibilities for the inputs form

export const TYPE_NUMBER = 'number';
export const TYPE_CHECKBOX = 'checkbox';
export const TYPE_CHECKBOX_AND_VALUE = 'checkboxAndValue';

export const inputElements = [
  TYPE_NUMBER,
  TYPE_CHECKBOX,
  TYPE_CHECKBOX_AND_VALUE,
] as const;

export type inputElementsType = (typeof inputElements)[number];
