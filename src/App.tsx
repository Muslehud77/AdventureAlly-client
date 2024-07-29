import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Toaster } from "react-hot-toast";

import CustomCursor from "./components/CustomCursor/CustomCursor";

const App = () => {



  return (
    <>
      <RouterProvider router={router} />
      <CustomCursor />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default App;