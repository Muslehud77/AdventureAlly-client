import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";
import { NavLink, useLocation } from "react-router-dom";
import { userPaths } from "../routes/UserRoutes";
import { useCart } from "../hooks/useCart";

export const UserRoutes = () => {

  const {pathname} = useLocation()

  const {cart} = useCart()

  

  return (
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <TooltipProvider>
        {userPaths.map((path) => (
          <Tooltip key={path.route}>
            <TooltipTrigger asChild>
              <NavLink
                to={path.route}
                className={`flex relative h-9 w-9 items-center justify-center rounded-lg ${
                  path.route
                    ? pathname.includes(path.route) && "bg-black text-white"
                    : pathname === "/dashboard"
                    ? "bg-gray-200 text-black"
                    : ""
                } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                {path.route === "cart" && cart.length ? (
                  <div className="absolute rounded-full top-0 right-0 text-white bg-red-500 size-4 text-xs flex justify-center items-center">
                    <span>{cart.length}</span>
                  </div>
                ) : (
                  <></>
                )}
                {path.icon}
                <span className="sr-only">{path.name}</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">{path.name}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </nav>
  );
};