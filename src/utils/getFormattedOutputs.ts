import { outputsType } from '@/types/outputsType';
// functions to format the outputs to be displayed in the table / chart

export const getFormattedOutputs = (outputs: outputsType): outputsType =>
  // non-integer are possible here due to toxique
  outputs.map((output) => parseFloat(output.toFixed(2))) as outputsType;

export const getFormattedOutputsAsPercentage = (
  outputs: outputsType
): outputsType => {
  const totalOutputs = outputs.reduce((a, b) => a + b, 0);
  return outputs.map((output) =>
    parseFloat(((output / totalOutputs) * 100).toFixed(1))
  ) as outputsType;
};

export const getFormattedOutputsAsCumulativePercentage = (
  outputs: outputsType
): outputsType => {
  const totalOutputs = outputs.reduce((a, b) => a + b, 0);
  return outputs.map((_, index) =>
    parseFloat(
      (
        (outputs.reduce((a, b, j) => a + (index <= j ? b : 0), 0) /
          totalOutputs) *
        100
      ).toFixed(1)
    )
  ) as outputsType;
};
