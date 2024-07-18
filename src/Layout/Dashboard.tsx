import logo from "../assets/logos/black-without-branding.png";
import whiteLogo from "../assets/logos/white-without-branding.png"
import { Link, Outlet } from "react-router-dom";

import User from "../components/User/User";
import NavRoutes from "./NavRoutes";
import { ThemeChanger } from "../components/ThemeChanger/ThemeChanger";
import { useTheme } from "../components/ThemeProvider";

export default function Dashboard() {

  const {actualTheme} = useTheme()

  
  return (
    <div className="flex gap-5 min-h-screen w-full bg-background">
      <aside className="fixed z-50 h-full w-14 py-5  px-2 flex flex-col justify-between ">
        <div className="space-y-5">
          <Link to={"/"} className="flex justify-center items-center">
            <img src={actualTheme === "light" ? logo : whiteLogo} className="w-10/12" />
          </Link>
          <hr className="border border-gray-400 border-b-1" />
          <NavRoutes />
        </div>
        <User isDashboard={true} />
      </aside>
      <div className="w-full">
        <div className="w-full flex justify-end items-end p-1">
          <ThemeChanger />
        </div>
        <div className="pl-16 w-full pr-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
