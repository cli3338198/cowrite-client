import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import { User, UserManagerContext } from "../types/interfaces";
import { socketConnectionContext } from "./SocketConnectionManager";
import { EventStrings } from "../types/enums";

export const userManagerContext = createContext({} as UserManagerContext);

export default function UserManager({ children }: { children: ReactNode }) {
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  const [users, setUsers] = useState<null | User[]>(null);
  const { socket } = useContext(socketConnectionContext);

  // get initial users
  useEffect(() => {
    socket.emit(EventStrings.getUsers);
  }, [socket]);

  // receive initial users
  useEffect(() => {
    socket.on(EventStrings.getUsers, (jsonUsers: string) => {
      setUsers(JSON.parse(jsonUsers) as User[]);
    });
  }, [socket]);

  return (
    <userManagerContext.Provider value={{ selectedUser, users }}>
      {children}
    </userManagerContext.Provider>
  );
}
