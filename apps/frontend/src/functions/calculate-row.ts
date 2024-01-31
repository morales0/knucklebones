export const calculateRow = (row: number[], stacks: Record<number, number>) =>
  row.reduce((sum, cell) => cell * (stacks[cell] ?? 1) + sum, 0);
