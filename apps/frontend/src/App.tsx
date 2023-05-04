import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Grid from "./components/grid";
import Player from "./components/player";

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
      <div>
        <Grid cells={[]} />
        <Grid cells={[]} />
      </div>
      <Player name="Opponent" points={0} />
    </div>
  );
}

export default App;
