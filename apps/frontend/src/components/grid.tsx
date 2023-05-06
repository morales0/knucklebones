import "../styles/grid.css";
import Dice from "./dice";

type Props = {
  cells: number[][];
  scorePos: "top" | "bottom";
};

const Grid = ({ cells, scorePos }: Props) => {
  console.log(cells);

  const Score = () => (
    <div className="score">
      <div>0</div>
      <div>0</div>
      <div>0</div>
    </div>
  );

  return (
    <div className={`grid score_${scorePos}`}>
      {scorePos === "top" && <Score />}

      <div className="cells">
        {cells.map((row, i) => (
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
