import { CSSProperties, useContext } from "react";
import { userManagerContext } from "../context/UserManager";
import UserAvatar from "./UserAvatar";

function makeStyle() {
  return {
    display: "flex",
  } as CSSProperties;
}

export default function UsersList() {
  const { users } = useContext(userManagerContext);

  return (
    <div style={makeStyle()}>
      {users && users.map((user) => <UserAvatar user={user} />)}
    </div>
  );
}
