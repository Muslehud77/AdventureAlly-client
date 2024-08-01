import { useEffect, useRef, useState } from "react";
import exploreVideo from "../../assets/VideoSection/nature.mp4";
import explore from "../../assets/explore.jpg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const ExploreOutdoors = () => {
  const [mouseAngle, setMouseAngle] = useState(0);
  const eyes = useRef(null);

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
        ease: "circ.out",
      });
    },
    { scope: eyes, dependencies: [mouseAngle] }
  );

  return (
    <div className="h-[90vh] w-full relative flex justify-center items-center">
      {/* <div className="w-full h-full  flex justify-center items-center">
        <img className="w-1/2" src={explore} />
      </div> */}

      <div ref={eyes} className="flex gap-5">
        <div className="size-56 bg-white rounded-full overflow-hidden flex justify-center items-center">
          <div className="flex justify-center items-center size-36 bg-black rounded-full overflow-hidden eyeball">
            <div
              style={{ transform: `rotate(${mouseAngle}deg)` }}
              className="w-full h-6 "
            >
              <div className="bg-white rounded-full w-2/12  h-full"></div>
            </div>
          </div>
        </div>
        <div className="size-56 bg-white rounded-full overflow-hidden flex justify-center items-center">
          <div className="flex justify-center items-center size-36 bg-black rounded-full overflow-hidden eyeball">
            <div
              style={{ transform: `rotate(${mouseAngle}deg)` }}
              className="w-full h-6"
            >
              <div className="bg-white rounded-full w-2/12  h-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* <video
        className="h-[120vh] w-full object-cover"
        
        loop
        muted
        playsInline
        controls={false}
      >
        <source src={exploreVideo} type="video/mp4" />
      </video> */}
    </div>
  );
};

export default ExploreOutdoors;
