import { useEffect } from "react"


import Navbar from "./components/Navbar/Navbar"
import { Outlet } from "react-router-dom"


function App() {
  

  // useEffect(()=>{

  //   const handleOnBeforeUnload=(e:BeforeUnloadEvent)=>{
  //     e.preventDefault()
     
  //     return (e.returnValue = "")
  //   }

  //   window.addEventListener("beforeunload", handleOnBeforeUnload, {
  //     capture: true,
  //   });


  //   return () => {
  //     window.removeEventListener("beforeunload", handleOnBeforeUnload);
  //   };

  // },[])


  return (
    <div className="bg-secondary">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App
