import { useIsFirstRender } from "../hooks/useIsFirstRender";
import UsersList from "./UsersList";

export default function UsersPane() {
  const isFirstRender = useIsFirstRender();

  console.log({ isFirstRender });

  return (
    <>
      {/* Initially present a list of users */}
      {/* When the document has loaded, replace the list with all the users with access to the document, grey out the users not currently active! */}
      {isFirstRender && <UsersList />}
    </>
  );
}
