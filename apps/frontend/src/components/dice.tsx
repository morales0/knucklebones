import classes from "../styles/dice.module.css";
import cx from "clsx";

type DiceProps = {
  value: number;
  className?: string;
  "data-stack"?: number;
};

const Dice = ({ value, className, ...rest }: DiceProps) => {
  return (
    <div className={cx(className, classes.dice)} data-value={value} {...rest}>
      {[...new Array(value)].map((_, i) => (
        <div key={`dice-${i}`} className={classes.dot} />
      ))}
    </div>
  );
};

export default Dice;
