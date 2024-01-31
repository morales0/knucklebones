export const sumArray = (array: number[]) =>
  array.reduce<number>((acc, curr) => acc + curr, 0);
