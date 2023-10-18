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

    const handleUnload = (evt: BeforeUnloadEvent) => {
      // socket.emit("disconnect-request");
      localStorage.setItem(socket.id, socket.id);
      socket.emit("TEST", socket.id);
      socket.disconnect();

      evt.returnValue = "Are you sure!";
      evt.preventDefault();
    };

    // disconnect from server when browser closes
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      socket.disconnect();
    };
  }, []);

  return (
    <socketConnectionContext.Provider value={{ socket }}>
      {children}
    </socketConnectionContext.Provider>
  );
}
