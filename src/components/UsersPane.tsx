import { useContext } from "react";
import { useIsFirstRender } from "../hooks/useIsFirstRender";
import UsersList from "./UsersList";
import { userManagerContext } from "../context/UserManager";

export default function UsersPane() {
  const isFirstRender = useIsFirstRender();
  const { selectedUser } = useContext(userManagerContext);

  return (
    <>
      {/* Initially present a list of users */}
      {/* When the document has loaded, replace the list with all the users with access to the document, grey out the users not currently active! */}
      {(isFirstRender || selectedUser === null) && <UsersList />}
    </>
  );
}
