// values correspond to the rows index in the wound table. (-1 => <0, 0 => 0-1, ...)
// It's divided by 2 as compared to the values in the head column of the wound table
// It's to make it easier to go one row down/up

export const woundIntensity = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type woundIntensityType = (typeof woundIntensity)[number];
