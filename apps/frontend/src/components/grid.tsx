import { calculateRow, findStacks } from "src/functions";
import classes from "../styles/grid.module.css";
import Dice from "./dice";
import cx from "clsx";

type GridProps = {
  cells: number[][];
  opponent?: boolean;
  addToRow: (row: number) => void;
};

const Grid = ({ cells, opponent = false, addToRow }: GridProps) => {
  const scorePos = opponent ? "bottom" : "top";

  const stacks = cells.map((row) => findStacks(row));

  const Score = () => (
    <div className={classes.score}>
      {cells.map((row, i) => (
        <div key={`score-${scorePos}-${i}`} className={classes.points}>
          {calculateRow(row, stacks[i])}
        </div>
      ))}
    </div>
  );

  const handleRowSelect = (i: number) => {
    // console.log("row selected", i);
    addToRow(i);
  };

  return (
    <div className={cx(classes.grid)}>
      {scorePos === "top" && <Score />}

      <div className={cx(classes.cells)}>
        {cells.map((row, i) => (
          <button
            className={cx(classes.row, {
              [classes.reverseRow]: scorePos === "top",
            })}
            onClick={() => handleRowSelect(i)}
            disabled={row.length === 3}
          >
            {[...new Array(3)].map((_, j) =>
              cells[i][2 - j] ? (
                <Dice
                  value={cells[i][2 - j]}
                  data-stack={stacks[i][cells[i][2 - j]] ?? 0}
                />
              ) : (
                <div className={classes.cell} />
              )
            )}
          </button>
        ))}
      </div>

      {scorePos === "bottom" && <Score />}
    </div>
  );
};

export default Grid;
