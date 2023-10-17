import { useIsFirstRender } from "../hooks/useIsFirstRender";
import UsersList from "./UsersList";

export default function UsersPane() {
  const isFirstRender = useIsFirstRender();

  console.log({ isFirstRender });

  return (
    <>
      {/* Initially present a list of users */}
      {isFirstRender && <UsersList />}
    </>
  );
}
