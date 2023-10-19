import { ReactNode, createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "../types/interfaces";
import { EventStrings } from "../types/enums";

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
      socket.emit(EventStrings.disconnect);
      socket.disconnect();

      evt.returnValue = "";
      evt.preventDefault();
    };

    // disconnect from server when window closes
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      socket.disconnect(); // TODO: is this needed?
    };
  }, []);

  return (
    <socketConnectionContext.Provider value={{ socket }}>
      {children}
    </socketConnectionContext.Provider>
  );
}
