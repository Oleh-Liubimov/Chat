import { io } from "socket.io-client";

export const socket = io("http://192.168.0.107:8080", {
  transports: ["websocket"],
});
