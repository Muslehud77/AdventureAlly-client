import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import AddProduct from "../pages/AddProduct/AddProduct";
import LoginPage from "../pages/loginRegister/Login";
import Register from "../pages/loginRegister/Register";
import Dashboard from "./../Layout/Dashboard";
import { userDashboardRoutes } from "./UserRoutes";
import ProtectedRouteForLoginRegister from "../ProtectedRoute/ProtectedRouteForLoginRegister";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { adminDashboardRoutes } from "./AdminRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
    ],
  },

  {
    path: "/login",
    element: (
      <ProtectedRouteForLoginRegister>
        <LoginPage />
      </ProtectedRouteForLoginRegister>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <ProtectedRouteForLoginRegister>
        <Register />
      </ProtectedRouteForLoginRegister>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [...userDashboardRoutes, ...adminDashboardRoutes],
  },
]);
