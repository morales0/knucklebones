type Props = {
  name: string;
  score: number;
};

const PlayerGrid = ({ name, score }: Props) => {
  return (
    <div className="player_grid">
      <div className="score">
        {name}: {score}
      </div>
      <div className="grid"></div>
    </div>
  );
};

export default PlayerGrid;
