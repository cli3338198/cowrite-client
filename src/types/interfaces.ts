import { Socket } from "socket.io-client";

export interface ISocketContext {
  socket: Socket;
}

export interface IClientToServerEvents {
  hello: () => void;
  textChange: (delta: string) => void;
}
