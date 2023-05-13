import "../styles/player.css";
import Dice from "./dice";

const RollSpace = () => {
  return (
    <div className="rollSpace">
      <Dice value={4} />
    </div>
  );
};

const ScoreBoard = ({ name, score }: { name: string; score: number }) => {
  return (
    <div className="scoreBoard">
      <h1>{name}</h1>
      <h3>{score}</h3>
    </div>
  );
};

type Props = {
  name: string;
  score: number;
  opponent?: boolean;
};

const Player = ({ name, score, opponent = false }: Props) => {
  return (
    <div className={`player ${opponent ? "opponent" : ""}`}>
      <ScoreBoard name={name} score={score} />
      <RollSpace />
    </div>
  );
};

export default Player;
