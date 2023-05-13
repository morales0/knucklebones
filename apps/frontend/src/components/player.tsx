import "../styles/player.css";
import Dice from "./dice";

const RollSpace = () => {
  return (
    <div className="rollSpace">
      <Dice value={4} />
    </div>
  );
};

const ScoreBoard = ({
  name,
  score,
  updateName,
}: {
  name: string;
  score: number;
  updateName: (value: string) => void;
}) => {
  return (
    <div className="scoreBoard">
      {}
      <h1>{name}</h1>
      <input
        className="playerName"
        type="text"
        value={name}
        onChange={(e) => updateName(e.target.value)}
      />
      <h3>{score}</h3>
    </div>
  );
};

type Props = {
  name: string;
  updateName: (value: string) => void;
  score: number;
  opponent?: boolean;
};

const Player = ({ name, updateName, score, opponent = false }: Props) => {
  return (
    <div className={`player ${opponent ? "opponent" : ""}`}>
      <div className="scoreBoard">
        {opponent ? (
          <h1>{name}</h1>
        ) : (
          <input
            className="playerName"
            type="text"
            value={name}
            onChange={(e) => updateName(e.target.value)}
          />
        )}
        <h3>{score}</h3>
      </div>
      <RollSpace />
    </div>
  );
};

export default Player;
