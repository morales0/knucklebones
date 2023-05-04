type Props = {
  cells: number[];
};

const Grid = ({ cells }: Props) => {
  console.log(cells);

  return <div className="grid">grid</div>;
};

export default Grid;
