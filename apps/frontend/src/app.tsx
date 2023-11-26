import { useEffect, useState } from "react";
import Grid from "./components/grid";
import Player from "./components/player";
import "./styles/app.css";

const emptyGrid: number[][] = [
  [0, 2, 5],
  [1, 3, 4],
  [2, 6, 4],
];
const sumArray = (array: number[]) =>
  array.reduce<number>((acc, curr) => acc + curr, 0);

function App() {
  const [username, setUsername] = useState<string>("You");
  const [turn, setTurn] = useState<"user" | "opponent">("user");
  const [userDice, setUserDice] = useState<number | undefined>(undefined);
  const [oppDice, setOppDice] = useState<number | undefined>(undefined);
  const [userGrid, setUserGrid] = useState<number[][]>([[], [], []]);
  const [opponentGrid, setOpponentGrid] = useState<number[][]>([[], [], []]);

  const usersTurn = userDice !== undefined;

  // Function that adds a dice to a row
  const addToUserRow = (row: number) => {
    console.log("adding to row", row);
    // If the user has not selected a dice, return
    if (userDice === undefined) return;
    // If the row is full, return
    if (userGrid[row].length === 3) return;
    // Add the dice to the row
    setUserGrid((prev) => {
      const newGrid = [...prev];
      newGrid[row] = [...newGrid[row], userDice];
      return newGrid;
    });
    // Reset the selected dice
    setUserDice(undefined);
    setTurn("opponent");
  };

  const addToOpponentRow = (row: number) => {
    console.log("adding to row", row);
    // If the user has not selected a dice, return
    if (oppDice === undefined) return;
    // If the row is full, return
    if (opponentGrid[row].length === 3) return;
    // Add the dice to the row
    setOpponentGrid((prev) => {
      const newGrid = [...prev];
      newGrid[row] = [...newGrid[row], oppDice];
      return newGrid;
    });
    // Reset the selected dice
    setOppDice(undefined);
    setTurn("user");
  };

  // Set die when turn changes
  useEffect(() => {
    if (turn === "user") setUserDice(Math.floor(Math.random() * 6) + 1);
    if (turn === "opponent") {
      const newOppDice = Math.floor(Math.random() * 6) + 1;
      setOppDice(newOppDice);
      // After 1-2 seconds, add the dice to a random valid row
      const randomTimeout = Math.floor(Math.random() * 1000) + 1000;
      setTimeout(() => {
        const validRows = opponentGrid.reduce<number[]>(
          (rows, row, index) => (row.length < 3 ? [...rows, index] : rows),
          []
        );

        if (validRows.length > 0) {
          const randomRowIndex = Math.floor(Math.random() * validRows.length);
          const randomRow = validRows[randomRowIndex];
          setOpponentGrid((prev) => {
            const newGrid = [...prev];
            newGrid[randomRow] = [...newGrid[randomRow], newOppDice];
            return newGrid;
          });
        }
        setOppDice(undefined);
        setTurn("user");
      }, randomTimeout);
    }
  }, [turn]);

  return (
    <div className="app">
      <Player
        name={username}
        updateName={(value) => setUsername(value)}
        score={sumArray(userGrid.map((row) => sumArray(row)))}
        dice={userDice}
      />
      <div className="game">
        <Grid
          cells={opponentGrid}
          scorePos="bottom"
          addToRow={addToOpponentRow}
        />
        <span className="vs">VS</span>
        <Grid cells={userGrid} scorePos="top" addToRow={addToUserRow} />
      </div>
      <Player
        name="Opponent"
        updateName={(value) => setUsername(value)}
        score={sumArray(opponentGrid.map((row) => sumArray(row)))}
        opponent
        dice={oppDice}
      />
    </div>
  );
}

export default App;

// const socket = io("localhost:3000");
// const [messages, setMessages] = useState<string[]>([]);

/*
  useEffect(() => {
    // When server connects with us, log and send message
    socket.on("connect", () => {
      console.log("conncected", socket);
      socket.emit("message", `Hi, I'm ${socket.id}`);
    });

    // When server disconnects with us, log
    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    // When server sends us a "message" event, add to screen
    socket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);
  */
