import { ReactNode, createContext } from "react";
import { io } from "socket.io-client";
import { ISocketContext } from "../types/interfaces";

const socket = io("http://localhost:5000/"); // TODO: fix this

export const socketConnectionContext = createContext({} as ISocketContext);

export default function SocketConnectionManager({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <socketConnectionContext.Provider value={{ socket }}>
      {children}
    </socketConnectionContext.Provider>
  );
}
