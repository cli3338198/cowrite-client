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

  // select a user
  function selectUser(id: User["id"]) {
    if (users) {
      // setSelectedUser(users.filter((user) => user.id === id)[0]);
      socket.emit(EventStrings.selectUser, id);
    }
  }

  return (
    <userManagerContext.Provider value={{ selectedUser, users, selectUser }}>
      {children}
    </userManagerContext.Provider>
  );
}
