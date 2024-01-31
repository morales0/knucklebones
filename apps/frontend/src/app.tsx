import classes from "@/styles/app.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Dice from "./components/dice";
import Grid from "./components/grid";
import { calculateScore, findStacks } from "./functions";

function App() {
  const [username, setUsername] = useState<string>("You");
  const [turn, setTurn] = useState<"user" | "opponent">("user");
  const [gameState, setGameState] = useState<"playing" | "gameover">("playing");
  const [winner, setWinner] = useState<
    "user" | "opponent" | "draw" | undefined
  >("draw");
  const [userDice, setUserDice] = useState<number | undefined>(undefined);
  const [oppDice, setOppDice] = useState<number | undefined>(undefined);
  const [userGrid, setUserGrid] = useState<number[][]>([[], [], []]);
  const [opponentGrid, setOpponentGrid] = useState<number[][]>([[], [], []]);

  const userScore = calculateScore(userGrid, userGrid.map(findStacks));
  const oppScore = calculateScore(opponentGrid, opponentGrid.map(findStacks));

  // Function that adds a dice to a row
  const addToUserRow = (row: number) => {
    // console.log("adding to row", row);
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
    // Remove all instances of this number in the corresponding opponent row
    setOpponentGrid((prev) =>
      prev.map((r, i) => r.filter((dice) => i !== row || dice !== userDice))
    );
    // Reset the selected dice
    setUserDice(undefined);
    setTurn("opponent");
  };

  const addToOpponentRow = (row: number) => {
    // console.log("adding to row", row);
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
    // Remove all instances of this number in the corresponding user row

    // Reset the selected dice
    setOppDice(undefined);
    setTurn("user");
  };

  const restartGame = () => {
    setUserGrid([[], [], []]);
    setOpponentGrid([[], [], []]);
    setGameState("playing");
    setTurn("user");
  };

  // Every turn
  useEffect(() => {
    // console.log("TURN", turn);
    const isGameOver =
      userGrid.every((row) => row.length === 3) ||
      opponentGrid.every((row) => row.length === 3);

    if (isGameOver) {
      // Find winner
      const userScore = calculateScore(userGrid, userGrid.map(findStacks));
      const oppScore = calculateScore(
        opponentGrid,
        opponentGrid.map(findStacks)
      );

      if (userScore > oppScore) {
        console.log("user wins");
        setWinner("user");
      } else if (oppScore > userScore) {
        setWinner("opponent");
        console.log("opponent wins");
      } else {
        setWinner("draw");
        console.log("draw");
      }
      setGameState("gameover");
    } else if (turn === "user") {
      setUserDice(Math.floor(Math.random() * 6) + 1);
    } else if (turn === "opponent") {
      const newOppDice = Math.floor(Math.random() * 6) + 1;
      setOppDice(newOppDice);
      // After 1-2 seconds, add the dice to a random valid row
      const randomTimeout = (Math.floor(Math.random() * 1000) * 3) / 4 + 750;
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

          setUserGrid((prev) =>
            prev.map((row, i) =>
              row.filter((dice) => i !== randomRow || dice !== newOppDice)
            )
          );
        }
        setOppDice(undefined);
        setTurn("user");
      }, randomTimeout);
    }
  }, [turn]);

  return (
    <div className={classes.app}>
      <div className={clsx(classes.opponent, classes.player)}>
        <div>
          <Dice value={oppDice ?? 0} />
        </div>
        <div>
          <div className={classes.name}>Opponent</div>
          <div className={classes.score}>{oppScore}</div>
        </div>
      </div>

      <div className={classes.game}>
        <Grid opponent cells={opponentGrid} addToRow={addToOpponentRow} />
        <span className="vs">VS</span>
        <Grid cells={userGrid} addToRow={addToUserRow} />
      </div>

      <div className={clsx(classes.user, classes.player)}>
        <div>
          <div className={classes.score}>{userScore}</div>
          <div className={classes.name}>Player</div>
        </div>
        {gameState === "gameover" ? (
          <div>
            <div>
              {winner === "user"
                ? "You Win!"
                : winner === "opponent"
                ? "Opponent Wins"
                : "Draw..."}
            </div>
            <button onClick={restartGame}>Play Again</button>
          </div>
        ) : (
          <div>
            <Dice value={userDice ?? 0} />
          </div>
        )}
      </div>

      {/* <Player
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
      /> */}
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
