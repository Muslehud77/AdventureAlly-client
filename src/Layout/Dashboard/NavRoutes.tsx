import { useUser } from "../../hooks/useUser";
import { AdminNavRoutes } from "./AdminNavRoutes";
import { UserRoutes } from "./UserNavRoutes";

const NavRoutes = () => {
  const { user } = useUser();

  const role = user?.role;

  return (
    <>
      {role === "admin" ? (
        <AdminNavRoutes />
      ) : role === "user" ? (
        <UserRoutes />
      ) : (
        <></>
      )}
    </>
  );
};

export default NavRoutes;
