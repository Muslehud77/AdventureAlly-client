import { FaRegUser } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { ImStatsBars } from "react-icons/im";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedForAdmin from "../ProtectedRoute/ProtectedForAdmin";
import ManageProducts from "../pages/ManageProducts/ManageProducts";
import AddProduct from "../pages/AddProduct/AddProduct";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import ManageOrders from "../pages/ManageOrders/ManageOrders";
import DeletedProducts from "../pages/DeletedProducts/DeletedProducts";
import EditProduct from "../pages/EditProduct/EditProduct";
import Statistics from "../pages/Statistics/Statistics";


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
    name: "Statistics",
    route: "statistics",
    element: (
      <ProtectedRoute>
        <Statistics />
      </ProtectedRoute>
    ),
    icon: <ImStatsBars className="h-5 w-5" />,
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
  {
    name: "Edit Product",
    route: "edit-product/:id",
    element: (
      <ProtectedForAdmin>
        <EditProduct />
      </ProtectedForAdmin>
    ),
    icon: null,
  },
];

export const adminDashboardRoutes = adminPaths.map((path) => {
  return {
    path: path.route,
    element: path.element,
    index: path.route ? false : true,
  };
});
