import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";
import { NavLink, useLocation } from "react-router-dom";

import { adminPaths } from "../routes/AdminRoutes";

export const AdminNavRoutes = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <TooltipProvider>
        {adminPaths.map((path, i) =>
          path.icon !== null ? (
            <div key={i + path.route}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={path.route}
                    className={`flex relative h-9 w-9 items-center justify-center rounded-lg ${
                      path.route
                        ? pathname.includes(path.route)
                          ? "bg-black text-white hover:text-gray-300 outline"
                          : "bg-primary-foreground"
                        : pathname === "/dashboard"
                        ? "bg-gray-500 text-white"
                        : "bg-primary-foreground"
                    } transition-colors  md:h-8 md:w-8`}
                  >
                    {path.icon}
                    <span className="sr-only">{path.name}</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">{path.name}</TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <></>
          )
        )}
      </TooltipProvider>
    </nav>
  );
};
