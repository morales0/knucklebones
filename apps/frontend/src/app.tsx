import Grid from "./components/grid";
import Player from "./components/player";
import "./styles/app.css";

const emptyGrid: number[][] = [
  [0, 2, 5],
  [1, 3, 4],
  [2, 6, 4],
];

// const socket = io("localhost:3000");

function App() {
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

  return (
    <div className="app">
      <Player name="You" points={0} />
      <div className="game">
        <Grid cells={emptyGrid} scorePos="bottom" />
        <Grid cells={emptyGrid} scorePos="top" />
      </div>
      <Player name="Opponent" points={0} />
    </div>
  );
}

export default App;
