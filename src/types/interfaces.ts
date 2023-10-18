import { Socket } from "socket.io-client";

export interface SocketContext {
  socket: Socket;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface UserManagerContext {
  selectedUser: User | null;
  users: User[] | null;
  selectUser: (id: User["id"]) => void;
}

// match functions and event string names
export interface ClientToServerEvents {
  hello: () => void;
  textChange: (delta: string) => void;
  getUsers: () => void;
  selectUser: (id: User["id"]) => void;
}
