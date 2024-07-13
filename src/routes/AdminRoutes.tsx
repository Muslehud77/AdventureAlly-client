import { FaRegUser } from "react-icons/fa";
import Profile from "../pages/Profile/Profile";
import Cart from "../pages/Cart/Cart";
import { LuShoppingCart } from "react-icons/lu";

import MyOrders from "../pages/MyOrders/MyOrders";
import { FaListUl } from "react-icons/fa6";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedForAdmin from "../ProtectedRoute/ProtectedForAdmin";
import ManageProducts from "../pages/ManageProducts/ManageProducts";

export const adminPaths = [
  {
    name: "Profile",
    route: "",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    icon: <FaRegUser className="h-5 w-5" />,
  },
  {
    name: "Manage Products",
    route: "manage-products",
    element: (
      <ProtectedForAdmin>
        <ManageProducts />
      </ProtectedForAdmin>
    ),
    icon: <LuShoppingCart className="h-5 w-5" />,
  },
  {
    name: "My Orders",
    route: "my-orders",
    element: (
      <ProtectedForAdmin>
        <MyOrders />
      </ProtectedForAdmin>
    ),
    icon: <FaListUl className="h-5 w-5" />,
  },
];

export const userDashboardRoutes = adminPaths.map((path) => {
  return {
    path: path.route,
    element: path.element,
    index: path.route ? false : true,
  };
});
