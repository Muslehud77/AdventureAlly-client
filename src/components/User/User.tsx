import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutAndClearCart, selectAuthUser } from "../../redux/features/auth/authSlice";

type UserProps = {
  isDashboard?: boolean;
};

const User = ({ isDashboard }: UserProps) => {

    const {pathname} = useLocation()
    
    const user = useAppSelector(selectAuthUser)

    const dispatch = useAppDispatch()


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <img
            src={user?.image}
          
            alt="Avatar"
            className="rounded-full size-10 object-contain bg-black"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isDashboard ? "start" : "end"}>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {pathname.includes("dashboard") ? (
            <Link to="/" className="w-full">
              Home
            </Link>
          ) : (
            <Link to="/dashboard" className="w-full">
              Dashboard
            </Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" to="/" onClick={() => dispatch(logoutAndClearCart())}>
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
