import logo from "../assets/logos/black-without-branding.png";
import { Link, Outlet } from "react-router-dom";

import User from "../components/User/User";
import NavRoutes from "./NavRoutes";

export default function Dashboard() {
  return (
    <div className="flex gap-5 min-h-screen w-full bg-background">
      <aside className="fixed inset-y-0 left-0 z-10 bg-white w-14 pt-5 flex-col border-r bg-background sm:flex">
        <Link to={"/"} className="flex justify-center items-center">
          <img src={logo} className="w-10/12" />
        </Link>
        <hr className="border border-gray-400 border-b-1 mt-4" />

        <NavRoutes />
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <User isDashboard={true} />
        </nav>
      </aside>
      <div className="pl-16 w-full mt-10">
        <Outlet />
      </div>
    </div>
  );
}
