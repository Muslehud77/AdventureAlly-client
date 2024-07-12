import { useEffect } from "react"
import LoginPage from "./pages/loginRegister/Login"
import Register from "./pages/loginRegister/Register"
import toast from "react-hot-toast"
import AllProducts from "./pages/AllProducts/AllProducts"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import AddProduct from "./pages/AddProduct/AddProduct"
import Cart from "./pages/Cart/Cart"
import Navbar from "./components/Navbar/Navbar"


function App() {
  

  useEffect(()=>{

    const handleOnBeforeUnload=(e:BeforeUnloadEvent)=>{
      e.preventDefault()
     
      return (e.returnValue = "")
    }

    window.addEventListener("beforeunload", handleOnBeforeUnload, {
      capture: true,
    });


    return () => {
      window.removeEventListener("beforeunload", handleOnBeforeUnload);
    };

  },[])


  return (
    <div>
      <Navbar/>
      <Cart/>
      <AddProduct/>
      <ProductDetails/>
      <AllProducts />
      <LoginPage />
      <Register />
    </div>
  );
}

export default App
