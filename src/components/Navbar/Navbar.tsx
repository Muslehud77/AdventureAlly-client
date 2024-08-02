import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logos/black_without_slogan.png";
import User from "../User/User";
import whiteLogo from "../../assets/logos/white_without_slogan.png";
import { useUser } from "../../hooks/useUser";
import { useCart } from "../../hooks/useCart";
import { ThemeChanger } from "../ThemeChanger/ThemeChanger";
import { useTheme } from "../ThemeProvider";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { TUser } from "../../redux/features/auth/authSlice";
import { TCart } from "../../redux/features/cart/cartSlice";

import { Sling as Hamburger } from "hamburger-react";

import useCursorController from "../../hooks/useCursorController";

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const sideNavBar = useRef(null);
  const navBar = useRef(null) as any;
  const { user } = useUser();
  const { pathname } = useLocation();
  const { actualTheme } = useTheme();
  const { cart } = useCart();
  const [sideNav, setSideNav] = useState<boolean>(false);

  const { mouseEnterCursorResize, mouseLeaveCursorResize } =
    useCursorController();

  useGSAP(
    () => {
      gsap.from("a,button", {
        y: -80,
        duration: 0.8,
        delay: 0,

        stagger: 0.1,
        ease: "elastic.out(2,1)",
      });

      if (sideNav) {
        gsap.fromTo(
          sideNavBar.current,
          { height: 0, autoAlpha: 0, duration: 0.8, ease: "back.out(1.7)" },
          {
            height: "100%",
            autoAlpha: 1,
            display: "flex",
            duration: 0.8,
            ease: "back.out(1.7)",
          }
        );
      } else {
        gsap.to(sideNavBar.current, {
          height: 0,
          autoAlpha: 0,
          display: "none",
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }
    },
    { scope: navBar, dependencies: [sideNav] }
  );

  return (
    <header
      ref={navBar}
      className={`fixed z-50 flex duration-500 w-full items-center  px-4 md:px-6 ${
        pathname === "/" ? "" : "bg-background"
      }`}
    >
      {pathname !== "/" && (
        <Link to="/" className="mr-6 flex items-center">
          <img
            src={actualTheme === "dark" ? whiteLogo : logo}
            className="w-20"
          />
          <span className="sr-only">AdventureAlly</span>
        </Link>
      )}
      <nav className="ml-auto flex items-center gap-4 md:gap-6">
        <div
          onMouseEnter={mouseEnterCursorResize}
          onMouseLeave={mouseLeaveCursorResize}
          className={`absolute top-3 right-2 z-50  md:hidden ${
            sideNav ? "text-white" : "text-foreground"
          } `}
        >
          <Hamburger toggled={sideNav} toggle={setSideNav} />
        </div>
        <div
          ref={sideNavBar}
          className={`fixed inset-0 bg-black/90 ${
            sideNav ? "flex" : "hidden"
          } justify-center items-center z-40`}
        >
          <div className="flex flex-col justify-center items-center gap-10">
            <NavbarMenus user={user as TUser} cart={cart} sideNav={sideNav} />
            <NavRoutes
              pathname={pathname}
              sideNav={sideNav}
              setSideNav={setSideNav}
            />
          </div>
        </div>
        {!sideNav && (
          <div className="w-full flex justify-center items-center px-4 py-5 gap-5">
            <div className=" justify-center items-center gap-6 hidden md:flex">
              <NavRoutes pathname={pathname} />
            </div>
            <NavbarMenus user={user as TUser} cart={cart} />
          </div>
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

const NavbarMenus = ({
  user,
  cart,
  sideNav,
}: {
  user: TUser;
  cart: TCart[];
  sideNav?: boolean;
}) => {
  return (
    <div
      className={`flex justify-center items-center gap-5 ${
        sideNav ? "" : "mr-8"
      } md:mr-0`}
    >
      <ThemeChanger />
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
              {cart.length ? (
                <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cart.length}
                </div>
              ) : (
                <></>
              )}
            </Link>
            <User />
          </>
        )
      ) : (
        <div className="relative">
          <Link className="bg-gray-200 py-1 px-4 rounded-md" to={"/login"}>
            Login
          </Link>
          <div className="absolute bottom-5 -right-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

interface NavRoutesProps {
  pathname: string;
  sideNav?: boolean;
  setSideNav?: (arg: boolean) => void;
}

const NavRoutes: React.FC<NavRoutesProps> = ({
  pathname,
  sideNav,
  setSideNav,
}) => {
  const navBarRoutes = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "All Products",
      path: "/all-products",
    },
    {
      name: "About Us",
      path: "/about",
    },
  ];

  return (
    <>
      {navBarRoutes.map((route) => (
        <Link
          onClick={() => {
            if (sideNav && setSideNav) {
              setSideNav(false);
            }
          }}
          key={route.path}
          to={route.path}
          className={`${
            pathname === route.path
              ? `${
                  sideNav
                    ? "text-white border-b"
                    : "text-muted-foreground border-b"
                }`
              : `${sideNav ? "text-white/80" : "text-foreground"}`
          } text-sm font-medium ${sideNav ? "" : "hover:text-foreground"}`}
        >
          {route.name}
        </Link>
      ))}
    </>
  );
};
