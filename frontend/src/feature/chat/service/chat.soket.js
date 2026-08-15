import { io } from "socket.io-client";

export const initalizeSocketconnection = (userId) => {
  const socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });
};
