import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("localhost:3000");

function App() {
  const [messages, setMessages] = useState<string[]>([]);

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

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={`message-${i}`}>{msg}</div>
      ))}
    </div>
  );
}

export default App;
