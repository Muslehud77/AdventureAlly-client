import { useEffect, useRef, useState } from "react";
import bannerVideo from "../../assets/banner/banner_video_3.mp4";
import gsap from "gsap";
import logo from "../../assets/logos/white-without-branding.png";

import useCursorController from "../../hooks/useCursorController";

const Banner = () => {
  const headingContainer = useRef(null);
  const [index, setIndex] = useState(0);

  const { mouseEnterControlBoth, mouseLeaveControlBoth } =
    useCursorController();

  const headings = [
    ["Gear Up", "for Your Next", "Adventure"],
    ["Explore the", "Great Outdoors", "with Confidence"],
    ["Your Ultimate", "Camping", "Companion"],
    ["Unleash Your", "Inner", "Explorer"],
    ["Where", "Adventure", "Begins"],
    ["Discover.", "Adventure.", "Thrive."],
    ["Camping Essentials", "for Every", "Journey"],
    ["Adventure", "Awaits", "Are You Ready?"],
    ["Nature’s Calling", "with", "AdventureAlly"],
    ["Equip.", "Explore.", "Experience."],
    ["Elevate Your", "Camping", "Experience"],
    ["Find Your", "Perfect Camp", "Gear Here"],
    ["Outfit Your", "Wild", "Side"],
    ["From Trail", "to Tent", "We’ve Got You Covered"],
    ["Journey", "Beyond", "Limits"],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(".headings h1", {
        opacity: 0,
        y: 200,
        x: 100,
        rotate: -20,
        stagger: 0.3,
        duration: 1,
        ease: "power2.in",
        onComplete: () => {
          setIndex((prevIndex) => (prevIndex + 1) % headings.length);
        },
      });
      gsap.to(".headings .logoInHeadings", {
        x: -110,
        duration: 1,
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [headings.length]);

  useEffect(() => {
    gsap.set(".headings h1", {
      opacity: 0,
      y: -400,
      x: -200,
      rotate: 30,
    });
    gsap.set(".headings .logoInHeadings", {
      opacity: 0,
      x: 0,
      y: 0,
      rotate: 0,
    });

    gsap.from(".headings .logoInHeadings", {
      opacity: 0,
      scale: 1,
      x: -110,
      duration: 2,
    });

    // Animation for the new elements
    gsap.to(".headings h1", {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      stagger: 0.3,
      duration: 2,
      ease: "power2.out",
    });
    gsap.to(".headings .logoInHeadings", {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 2,
      ease: "expo.out",
    });
  }, [index]);

  const headingMouseEnter = () => {
 mouseEnterControlBoth()
  };
  const headingMouseLeave = () => {
   mouseLeaveControlBoth()
  };

  return (
    <div data-scroll data-scroll-container data-scroll-speed="-.8" className="h-[101vh] -mt-20 relative  overflow-hidden">
   
      <video className="h-[120vh] w-full object-cover"  autoPlay loop muted playsInline controls={false} >
        <source src={bannerVideo} type="video/mp4"/>
      </video>
      <div className="absolute duration-300 inset-0 h-full w-full bg-background/10 dark:bg-background/50"></div>
      <div
        className={`absolute inset-0 h-full w-full flex justify-start items-center container mx-auto`}
      >
        <div
          ref={headingContainer}
          className="text-4xl md:text-8xl w-full md:w-[60vw] overflow-hidden py-10 font-thin text-white tracking-tighter"
        >
          {headings[index]?.map((item, i) => (
            <div key={i} className="flex headings">
              {i === 1 && (
                <div
                  onMouseEnter={headingMouseEnter}
                  onMouseLeave={headingMouseLeave}
                  className="logoInHeadings relative top-2 w-10 md:w-20 flex justify-center items-center mr-2 md:mr-5 pb-3 md:pb-0"
                >
                  <img src={logo} alt="Logo" />
                </div>
              )}
              <h1
                onMouseEnter={headingMouseEnter}
                onMouseLeave={headingMouseLeave}
              >
                {item}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
