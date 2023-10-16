import { Socket } from "socket.io-client";

export interface SocketContext {
  socket: Socket;
}

export interface ClientToServerEvents {
  hello: () => void;
  textChange: (delta: string) => void;
}
