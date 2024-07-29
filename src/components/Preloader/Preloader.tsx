
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
gsap.registerPlugin(useGSAP);

const Preloader = () => {
  const loadingContainer = useRef(null) as any;
  const adventure = "Adventure".split("") as string[];
  const ally = "Ally".split("") as string[];

  const [initialLoading, setInitialLoading] = useState(true);

  const { pathname } = useLocation();

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

    { scope: loadingContainer }
  );

  return (
    <div
      ref={loadingContainer}
      className={`fixed z-50 h-screen w-full transition-all duration-1000 flex justify-center items-center ${
        initialLoading ? "bg-background/90" : "bg-transparent"
      } `}
    >
      <h1
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
  );
};

export default Preloader;
