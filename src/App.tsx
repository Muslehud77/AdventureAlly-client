import { useEffect } from "react"
import LoginPage from "./pages/loginRegister/Login"
import Register from "./pages/loginRegister/Register"
import toast from "react-hot-toast"


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
 <LoginPage/>
 <Register/>
    </div>
  )
}

export default App
