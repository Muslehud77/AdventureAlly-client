import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { FaLinkSlash } from "react-icons/fa6";

gsap.registerPlugin(useGSAP);

function App() {

  const main = useRef(null) as any;

 

  const cursor = useRef(null) as any;
  const { contextSafe } = useGSAP({ scope: main });

  //loading section
  const text = useRef(null) as any;
  const loadingContainer = useRef(null) as any;
  const [initialLoading, setInitialLoading] = useLocalStorage(
    "initialLoading",
    true
  );
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

      if (initialLoading) {
        gsap.to(loadingContainer.current, {
          duration: 5,
          display: "none",
        });
      } else {
        gsap.to(loadingContainer.current, {
          duration: 0,
          display: "none",
        });
      }
    },

    { scope: text }
  );

  useEffect(() => {
    if (initialLoading) {
      setTimeout(() => {
        setInitialLoading(false);
      }, 4000);
    }
  }, []);

  const onMouseMove = contextSafe((e: any) => {
  

    gsap.to(cursor.current, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      width: "20px",
      height: "20px",
      ease: "elastic.out(1.2,0.5)",
      duration: 2,
    });
  });



  const onMouseEnter = contextSafe(() => {
    const links = main?.current?.querySelectorAll("a");
     const buttons = main?.current?.querySelectorAll("button");
    buttons?.forEach((button: HTMLElement) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(cursor.current, {
          scale: 4,
          duration:0.5
        });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(cursor.current, {
          scale: 1,
          duration: 0.5,
        });
      });
    });
    links?.forEach((link:HTMLElement) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(cursor.current, {
          scale: 4,
        });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(cursor.current, {
          scale: 1,
        });
      });
    });
  });

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      ref={main}
      className="main bg-secondary flex flex-col min-h-screen relative"
    >
      <div
        ref={loadingContainer}
        className={`absolute h-screen w-full transition-all duration-1000 flex justify-center items-center ${
          initialLoading ? "bg-background/80" : "bg-transparent"
        } `}
      >
        <h1
          ref={text}
          className={` ${
            initialLoading ? "text-foreground" : "opacity-0"
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
      <div
        ref={cursor}
        className="cursor z-[999] fixed rounded-full size-0 bg-white pointer-events-none mix-blend-difference"
      ></div>
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
