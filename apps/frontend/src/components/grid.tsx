import "../styles/grid.css";
import Dice from "./dice";

type Props = {
  cells: number[][];
  scorePos: "top" | "bottom";
};

const Grid = ({ cells, scorePos }: Props) => {
  const Score = () => (
    <div className="score">
      {cells.map((row, i) => (
        <div key={`score-${scorePos}-${i}`}>
          {row.reduce<number>((sum, cell) => cell + sum, 0)}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`grid score_${scorePos}`}>
      {scorePos === "top" && <Score />}

      <div className="cells">
        {cells.map((_, i) => (
          <div className="row">
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

      {scorePos === "bottom" && <Score />}
    </div>
  );
};

export default Grid;
