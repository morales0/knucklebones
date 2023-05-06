type Props = {
  value: number;
};

const Dice = ({ value }: Props) => {
  return <div className="cell dice">{value}</div>;
};

export default Dice;
