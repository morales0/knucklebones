import { Request, Response } from "express";
import app from "./app";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server);

// Route
app.get("/", (req: Request, res: Response) => {
  res.send("Socket server for Knucklebones");
});

// Socket
io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  // When client disconnects, log and notify to all other connections
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
    io.emit("message", `${socket.id} left`);
  });

  // When client sends "message" event, emit to all other connections
  socket.on("message", (msg) => {
    io.emit("message", `${socket.id}: ${msg}`);
  });
});

export default server;
