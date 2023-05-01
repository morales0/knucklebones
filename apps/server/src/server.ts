import { Request, Response } from "express";
import app from "./app";
import http from 'http';
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server);

// Route
app.get("/", (req: Request, res: Response) => {
  res.send("Socket server for Knucklebones");
});

// Socket
io.on('connection', (socket) => {
  console.log('a user connected');
});

export default server