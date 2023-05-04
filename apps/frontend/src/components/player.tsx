type Props = {
  name: string;
  points: number;
};

const Player = ({ name, points }: Props) => {
  return (
    <div className="player">
      {name} - {points}
    </div>
  );
};

export default Player;
