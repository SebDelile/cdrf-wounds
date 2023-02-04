export const woundIntensity = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type woundIntensityType = (typeof woundIntensity)[number];
