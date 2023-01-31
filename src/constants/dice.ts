export const dice = [1, 2, 3, 4, 5, 6] as const;

export type diceType = (typeof dice)[number];
