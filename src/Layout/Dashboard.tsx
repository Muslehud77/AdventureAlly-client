import logo from "../assets/logos/black-without-branding.png";
import { Link, Outlet } from "react-router-dom";

import User from "../components/User/User";
import NavRoutes from "./NavRoutes";

export default function Dashboard() {
  return (
    <div className="flex gap-5 min-h-screen w-full bg-background">
      <aside className="fixed h-full w-14 py-5  px-2 flex flex-col justify-between ">
        <div className="space-y-5">
          <Link to={"/"} className="flex justify-center items-center">
            <img src={logo} className="w-10/12" />
          </Link>
          <hr className="border border-gray-400 border-b-1" />

          <NavRoutes />
        </div>
        <User isDashboard={true} />
      </aside>
      <div className="pl-16 w-full mt-10 pr-5">
        <Outlet />
      </div>
    </div>
  );
}
