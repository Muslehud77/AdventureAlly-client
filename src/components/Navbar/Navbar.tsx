
import { Link } from "react-router-dom";
import logo from "../../assets/logos/black_without_slogan.png"
import User from "../User/User";

import { useUser } from "../../hooks/useUser";
import { useCart } from "../../hooks/useCart";


export default function Navbar() {

  const {user} = useUser()


  const {cart} = useCart()


  return (
    <header className="flex h-16 w-full items-center bg-background px-4 md:px-6">
      <Link to="/" className="mr-6 flex items-center">
        <img src={logo} className="w-20" />
        <span className="sr-only">AdventureAlly</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 md:gap-6">
        <Link
          to="/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Home
        </Link>
        <Link
          to="/all-products"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          All Products
        </Link>
        <Link
          to="/about"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          About Us
        </Link>

        {user ? (
          user?.role === "admin" ? (
            <>
              <User />
            </>
          ) : (
            <>
              {" "}
              <Link to="/dashboard/cart" className="relative">
                <ShoppingCartIcon className="h-6 w-6 text-muted-foreground" />
               {
                cart.length ?  <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                 {cart.length}
                </div> : <></>
               }
              </Link>
              <User />
            </>
          )
        ) : (
          <>
          <Link to={"/login"}>Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}



function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

