import Navbar from "../../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

import Preloader from "../../components/Preloader/Preloader";

function MainLayout() {
  const { pathname } = useLocation();

  return (
    <div className="bg-secondary flex flex-col min-h-screen ">
      <Preloader />

      <Navbar />
      <div
        className={`flex-1 transition all duration-300 `}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
