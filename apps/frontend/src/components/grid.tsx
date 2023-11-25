import "../styles/grid.css";
import Dice from "./dice";

type Props = {
  cells: number[][];
  scorePos: "top" | "bottom";
  addToRow: (row: number) => void;
};

const Grid = ({ cells, scorePos, addToRow }: Props) => {
  const Score = () => (
    <div className="score">
      {cells.map((row, i) => (
        <div key={`score-${scorePos}-${i}`}>
          {row.reduce<number>((sum, cell) => cell + sum, 0)}
        </div>
      ))}
    </div>
  );

  const handleRowSelect = (i: number) => {
    console.log("row selected", i);
    addToRow(i);
  };

  return (
    <div className={`grid score_${scorePos}`}>
      <div className="cells">
        {cells.map((_, i) => (
          <div className="row" onClick={() => handleRowSelect(i)}>
            {[...new Array(3)].map((_, j) =>
              cells[i][j] ? (
                <Dice value={cells[i][j]} />
              ) : (
                <div className="cell" />
              )
            )}
          </div>
        ))}
      </div>
      <Score />
    </div>
  );
};

export default Grid;
