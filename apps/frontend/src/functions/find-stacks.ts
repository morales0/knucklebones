export const findStacks = (row: number[]) =>
  row.reduce(
    (acc, num) => ({
      ...acc,
      [num]: (acc[num] || 0) + 1,
    }),
    {} as Record<number, number>
  );
