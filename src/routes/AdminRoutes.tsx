import { FaRegUser } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedForAdmin from "../ProtectedRoute/ProtectedForAdmin";
import ManageProducts from "../pages/ManageProducts/ManageProducts";
import AddProduct from "../pages/AddProduct/AddProduct";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import ManageOrders from "../pages/ManageOrders/ManageOrders";
import DeletedProducts from "../pages/DeletedProducts/DeletedProducts";


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
    name: "Manage Orders",
    route: "manage-orders",
    element: (
      <ProtectedForAdmin>
        <ManageOrders />
      </ProtectedForAdmin>
    ),
    icon: <TbTruckDelivery className="h-5 w-5" />,
  },
  {
    name: "Manage Products",
    route: "manage-products",
    element: (
      <ProtectedForAdmin>
        <ManageProducts />
      </ProtectedForAdmin>
    ),
    icon: <AiOutlineProduct className="h-5 w-5" />,
  },
  {
    name: "Deleted Products",
    route: "deleted-products",
    element: (
      <ProtectedForAdmin>
        <DeletedProducts />
      </ProtectedForAdmin>
    ),
    icon: <AiOutlineDelete className="h-5 w-5" />,
  },
  {
    name: "Add Product",
    route: "add-product",
    element: (
      <ProtectedForAdmin>
        <AddProduct />
      </ProtectedForAdmin>
    ),
    icon: <MdFormatListBulletedAdd className="h-5 w-5" />,
  },
  {
    name: "Manage Users",
    route: "manage-users",
    element: (
      <ProtectedForAdmin>
        <ManageUsers />
      </ProtectedForAdmin>
    ),
    icon: <FaUsersCog className="h-5 w-5" />,
  },
];

export const adminDashboardRoutes = adminPaths.map((path) => {
  return {
    path: path.route,
    element: path.element,
    index: path.route ? false : true,
  };
});
