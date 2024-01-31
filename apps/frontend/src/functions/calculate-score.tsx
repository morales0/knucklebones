import { sumArray } from ".";
import { calculateRow } from "./calculate-row";

export const calculateScore = (
  cells: number[][],
  stacks: Record<number, number>[]
) => sumArray(cells.map((row, i) => calculateRow(row, stacks[i])));
