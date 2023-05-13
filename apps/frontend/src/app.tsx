import { useState } from "react";
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
  const [userGrid, setUserGrid] = useState<number[][]>([[], [], []]);
  const [opponentGrid, setOpponentGrid] = useState<number[][]>([[], [], []]);

  return (
    <div className="app">
      <Player
        name={username}
        updateName={(value) => setUsername(value)}
        score={sumArray(userGrid.map((row) => sumArray(row)))}
      />
      <div className="game">
        <Grid cells={userGrid} scorePos="bottom" />
        <span className="vs">VS</span>
        <Grid cells={opponentGrid} scorePos="top" />
      </div>
      <Player
        name="Opponent"
        updateName={(value) => setUsername(value)}
        score={sumArray(opponentGrid.map((row) => sumArray(row)))}
        opponent
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
