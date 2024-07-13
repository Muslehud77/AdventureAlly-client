



import {  Outlet } from "react-router-dom";
import { UserRoutes } from "./UserNavRoutes";
import User from "../components/User/User";


export default function Dashboard() {
  return (
    <div className="flex gap-5 min-h-screen w-full bg-background">
      <aside className="fixed inset-y-0 left-0 z-10 bg-white w-14 pt-5 flex-col border-r bg-background sm:flex">
        <UserRoutes />
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
       <User isDashboard={true}/>
        </nav>
      </aside>
      <div className="pl-16 w-full">
      <Outlet/>
      </div>
    </div>
  );
}

