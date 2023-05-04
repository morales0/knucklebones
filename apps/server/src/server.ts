import { type Request, type Response } from "express";
import app from "./app";
import http from "http";
import { Server } from "socket.io";
import {
  START_GAME,
  ROLL_DICE,
  PLAY_DICE,
  UPDATE_USERNAME,
  JOIN_ROOM,
  MAKE_ROOM,
  LEAVE_ROOM,
} from "./events";

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

  // Player events
  socket.on(UPDATE_USERNAME, (username: string) => {
    // Update player state/object
    // Update room state/object
    // Emit new state
  });

  socket.on(JOIN_ROOM, (roomId: string) => {
    // Search for room
    // Make sure user isn't in room
    // Add user to room
    // Notify other members
  });

  socket.on(MAKE_ROOM, () => {
    // Create new ID
    // Create room
    // Add user to room
    // Send user room ID
  });

  socket.on(LEAVE_ROOM, () => {
    // Find what room user is in
    // Remove user from room
    // Emit to other members
    // If room is empty, delete room
  });

  // Gameplay events

  socket.on(START_GAME, () => {
    // Get room ID
    // Init game state
    // Send start game to room
  });

  socket.on(ROLL_DICE, () => {
    // Get room ID
    // Roll random number
    // Send number to all members in room
  });

  socket.on(PLAY_DICE, (cell: number[]) => {
    // Get room ID
    // Update game state grid
    // Check if this is a winning move
    // If end game, emit to room
    // Send game state grid to room
  });

  // When client sends "message" event, emit to all other connections
  socket.on("message", (msg: string) => {
    io.emit("message", `${socket.id}: ${msg}`);
  });
});

export default server;
