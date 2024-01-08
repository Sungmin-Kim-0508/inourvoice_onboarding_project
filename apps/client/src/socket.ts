import { Socket, io } from "socket.io-client";

export const socket: Socket = io("http://localhost:8000", {
  autoConnect: false,
});

export const socketGroup: Socket = io("http://localhost:8000/group", {
  autoConnect: false,
});
