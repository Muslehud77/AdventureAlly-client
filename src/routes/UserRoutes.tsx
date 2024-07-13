import { FaRegUser } from "react-icons/fa";
import Profile from "../pages/Profile/Profile";
import Cart from "../pages/Cart/Cart";
import { LuShoppingCart } from "react-icons/lu";

import MyOrders from "../pages/MyOrders/MyOrders";
import { FaListUl } from "react-icons/fa6";
import ProtectedForUser from "../ProtectedRoute/ProtectedForUser";


export const userPaths = [
  {
    name: "Profile",
    route: "profile",
    element: <Profile />,
    icon: <FaRegUser className="h-5 w-5" />,
  },
  {
    name: "My Cart",
    route: "cart",
    element: (
      <ProtectedForUser>
        <Cart />
      </ProtectedForUser>
    ),
    icon: <LuShoppingCart className="h-5 w-5" />,
  },
  {
    name: "My Orders",
    route: "my-orders",
    element: (
      <ProtectedForUser>
        <MyOrders />
      </ProtectedForUser>
    ),
    icon: <FaListUl className="h-5 w-5" />,
  },
];




export const userDashboardRoutes = userPaths.map(path=> {
    return {path: path.route, element: path.element}
})

