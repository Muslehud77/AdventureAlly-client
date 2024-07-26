import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { controlSize, selectCursor } from "./redux/features/cursor/cursorSlice";

gsap.registerPlugin(useGSAP);

function App() {
  const dispatch = useAppDispatch();
  const cursorSizeIsBig = useAppSelector(selectCursor);

  const { pathname } = useLocation();
  const main = useRef(null) as any;

  const cursor = useRef(null) as any;
  const { contextSafe } = useGSAP({ scope: main });

  //loading section
  const text = useRef(null) as any;
  const loadingContainer = useRef(null) as any;
  const [initialLoading, setInitialLoading] = useState(true);
  const adventure = "Adventure".split("") as string[];
  const ally = "Ally".split("") as string[];

  useGSAP(
    () => {
      if (cursorSizeIsBig) {
        gsap.to(cursor.current, {
          scale: 4,
          duration: 0.5,
        });
      } else {
        gsap.to(cursor.current, {
          scale: 1,
          duration: 0.5,
        });
      }
    },

    { scope: text, dependencies: [cursorSizeIsBig] }
  );

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
    if (pathname !== "/") {
      setInitialLoading(false);
    }
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
        dispatch(controlSize(true));
      });
      button.addEventListener("mouseleave", () => {
        dispatch(controlSize(false));
      });
    });
    links?.forEach((link: HTMLElement) => {
      link.addEventListener("mouseenter", () => {
        dispatch(controlSize(true));
      });
      link.addEventListener("mouseleave", () => {
        dispatch(controlSize(false));
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
        className={`fixed z-50 h-screen w-full transition-all duration-1000 flex justify-center items-center ${
          initialLoading ? "bg-background/90" : "bg-transparent"
        } `}
      >
        <h1
          ref={text}
          className={` ${
            initialLoading ? "text-foreground" : "opacity-0"
          }  font-bold  text-3xl md:text-7xl p-10 overflow-hidden transition-all duration-1000`}
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
      <div
        className={`flex-1 transition all duration-300 ${
          pathname === "/" ? "" : "mt-16"
        }`}
      >
        <Outlet />
      </div>
      <Footer />
      <div
        ref={cursor}
        className={`cursor  z-[999] fixed rounded-full size-0 bg-accent-foreground pointer-events-none ${
          cursorSizeIsBig ? "mix-blend-difference" : "bg-foreground"
        } `}
      ></div>
    </div>
  );
}

export default App;
