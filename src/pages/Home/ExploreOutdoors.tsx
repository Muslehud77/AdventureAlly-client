import { useEffect, useRef, useState } from "react";
import exploreVideo from "../../assets/VideoSection/nature.mp4";
import explore from "../../assets/explore.jpg";
import { FaPause } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useCursorController from "../../hooks/useCursorController";
import { useTheme } from "../../components/ThemeProvider";

gsap.registerPlugin(useGSAP);

const ExploreOutdoors = () => {
  const { setTheme, actualTheme, theme } = useTheme();
  const [userTheme, setUserTheme] = useState<"dark" | "system" | "light" | "">(
    ""
  );
  const { mouseEnterControlBoth, mouseLeaveControlBoth } =
    useCursorController();
  const [play, setPlay] = useState(false);
  const [mouseAngle, setMouseAngle] = useState(0);
  const container = useRef(null) as any;

  const mouseDirection = (e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = mouseX - window.innerWidth / 2;
    const deltaY = mouseY - window.innerHeight / 2;

    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    setMouseAngle(angle - 180);
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseDirection);

    return () => {
      window.removeEventListener("mousemove", mouseDirection);
    };
  }, []);

  useGSAP(
    () => {
      const xPercent = () => {
        if (mouseAngle < -180 && mouseAngle > -271) {
          // console.log("top-right")
          return {
            x: -mouseAngle / 20,
            y: mouseAngle / 20,
          };
        } else if (mouseAngle < 0 && mouseAngle < -271) {
          // console.log("top-left")
          return {
            x: mouseAngle / 20,
            y: mouseAngle / 20,
          };
        } else if (mouseAngle < 0 && mouseAngle > -90) {
          // console.log("bottom-left")

          let x = mouseAngle;
          let y = Math.abs(mouseAngle / 2 + 5);
          if (mouseAngle < -24) {
            x = -24;
          }

          if (y > 22) {
            y = Math.abs(mouseAngle / 2 + 30);
          }

          return {
            x,
            y,
          };
        } else if (mouseAngle < -90 && mouseAngle > -180) {
          // console.log("bottom-right")
          return {
            x: -mouseAngle / 20,
            y: -mouseAngle / 20,
          };
        } else {
          return { x: mouseAngle / 20, y: mouseAngle / 20 };
        }
      };

      const { x, y } = xPercent();

      gsap.to(".eyeball", {
        x,
        y,
      });
    },
    { scope: container, dependencies: [mouseAngle] }
  );

  useEffect(() => {
    const video = container?.current?.querySelector("video");

    if (play) {
      video?.play();
      if (actualTheme === "light") {
        setUserTheme(theme);
        setTheme("dark");
      } else {
        setUserTheme(theme);
      }
    } else {
      video?.pause();
      if (userTheme) {
        setTheme(userTheme);
      }
    }
  }, [play]);

  return (
    <div
      ref={container}
      onClick={() => setPlay(!play)}
      className="h-[90vh] overflow-hidden w-full relative flex justify-center items-center"
    >
      <div data-scroll data-scroll-speed="-.7" className="h-full w-full relative flex justify-center items-center">
        <div className="w-full h-full absolute flex justify-center items-center">
          <img className="w-10/12" src={explore} />
        </div>

        <div
          className={`absolute duration-500 flex gap-5 ${
            play ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="size-56 bg-background rounded-full overflow-hidden flex justify-center items-center relative">
            <h2 className="text-2xl absolute text-background top-[40%] z-40">
              PLAY
            </h2>
            <div className="flex justify-center items-center size-36 bg-foreground rounded-full overflow-hidden eyeball">
              <div
                style={{ transform: `rotate(${mouseAngle}deg)` }}
                className="w-full h-6 "
              >
                <div className="bg-background rounded-full w-2/12  h-full"></div>
              </div>
            </div>
          </div>
          <div className="size-56 bg-background rounded-full overflow-hidden flex justify-center items-center relative">
            <h2 className="text-2xl absolute text-background top-[40%] z-40">
              PLAY
            </h2>
            <div className="flex justify-center items-center size-36 bg-foreground rounded-full overflow-hidden eyeball">
              <div
                style={{ transform: `rotate(${mouseAngle}deg)` }}
                className="w-full h-6"
              >
                <div className="bg-background rounded-full w-2/12  h-full"></div>
              </div>
            </div>
          </div>
        </div>
        <FaPause
          onMouseEnter={mouseEnterControlBoth}
          onMouseLeave={mouseLeaveControlBoth}
          className={`text-7xl duration-500 opacity-0 text-white absolute z-40 ${
            play ? "hover:opacity-100" : "hidden"
          }`}
        />
        <video
          className={`absolute h-full w-full object-cover duration-500 ${
            play ? "opacity-100" : "opacity-0"
          }`}
          loop
          muted
          playsInline
          controls={false}
        >
          <source src={exploreVideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default ExploreOutdoors;
