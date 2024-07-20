import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

gsap.registerPlugin(useGSAP);

function App() {
  const text = useRef(null) as any;
  const loadingContainer = useRef(null) as any;
  const [loading, setLoading] = useState(true);
  const adventure = "Adventure".split("") as string[];
  const ally = "Ally".split("") as string[];

  useGSAP(
    () => {
      gsap.from(".adventure", {
        y: 150,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        stagger: 0.2,
      });
      gsap.from(".ally", {
        y: 150,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        stagger: -0.2,
      });

     if(loading){
       gsap.to(loadingContainer.current, {
         duration: 5,
         display: "none",
       });
     }
    },

    { scope: text }
  );

  // console.log(text?.current?.innerText);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  }, []);

  return (
    <div className="bg-secondary flex flex-col min-h-screen relative">
      <div
        ref={loadingContainer}
        className={`absolute h-screen w-full transition-all duration-1000 flex justify-center items-center ${
          loading ? "bg-background/80" : "bg-transparent"
        } `}
      >
        <h1
          ref={text}
          className={` ${
            loading ? "text-foreground" : "opacity-0"
          }  font-bold text-7xl p-10 overflow-hidden transition-all duration-1000`}
        >
          {adventure?.map((text, i) => (
            <span className="adventure inline-block" key={i}>
              {text}
            </span>
          ))}
          {ally?.map((text, i) => (
            <span className="ally inline-block" key={i}>
              {text}
            </span>
          ))}
        </h1>
      </div>
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;

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
