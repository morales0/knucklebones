import "../styles/dice.css";

type Props = {
  value: number;
};

const Dice = ({ value }: Props) => {
  return (
    <div className={`cell dice dice_${value}`}>
      {[...new Array(value)].map((_, i) => (
        <div key={i} className="dot" />
      ))}
    </div>
  );
};

export default Dice;
