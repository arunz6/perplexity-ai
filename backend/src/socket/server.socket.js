import { Server } from "socket.io";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  console.log("Socket.io initialized");

  io.on("connection", (socket) => {
    console.log("A user connected" + socket.id);
  });
};

export function getio() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}
