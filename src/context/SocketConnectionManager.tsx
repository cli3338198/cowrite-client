import { ReactNode, createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "../types/interfaces";

const socket = io("http://localhost:5000/"); // TODO: fix this

export const socketConnectionContext = createContext({} as SocketContext);

export default function SocketConnectionManager({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <socketConnectionContext.Provider value={{ socket }}>
      {children}
    </socketConnectionContext.Provider>
  );
}
