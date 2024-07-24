import { useEffect, useRef, useState } from "react";
import bannerVideo from "../../assets/banner/banner_video.mp4";
import gsap from "gsap";
import logo from "../../assets/logos/white-without-branding.png";

const Banner = () => {
  const headingContainer = useRef(null);
  const [index, setIndex] = useState(0);

  const headings = [
    ["Gear Up", "for Your Next", "Adventure"],
    ["Explore the", "Great Outdoors", "with Confidence"],
    ["Your Ultimate", "Camping", "Companion"],
    ["Unleash Your", "Inner", "Explorer"],
    ["Where", "Adventure", "Begins"],
    ["Discover.", "Adventure.", "Thrive."],
    ["Camping Essentials", "for Every", "Journey"],
    ["Adventure", "Awaits - Are", "You Ready?"],
    ["Nature’s Calling", "– Answer with", "AdventureAlly"],
    ["Equip.", "Explore.", "Experience."],
    ["Elevate Your", "Camping", "Experience"],
    ["Find Your", "Perfect Camp", "Gear Here"],
    ["Outfit Your", "Wild", "Side"],
    ["From Trail", "to Tent,", "We’ve Got You Covered"],
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

  return (
    <div className="max-h-screen relative">
      <video
        autoPlay
        src={bannerVideo}
        className="h-screen w-screen object-fill"
       
      />
      <div className="absolute duration-300 inset-0 h-full w-full bg-white/20 dark:bg-black/50"></div>
      <div
        className={`absolute inset-0 h-full w-full flex justify-start items-center container mx-auto`}
      >
        <div
          ref={headingContainer}
          className="text-4xl md:text-8xl w-full lg:w-[50vw] overflow-hidden py-10 font-semibold text-white tracking-tighter"
        >
          {headings[index]?.map((item, i) => (
            <div key={i} className="flex headings">
              {i === 1 && (
                <div className="logoInHeadings relative top-2 w-20 flex justify-center items-center mr-5">
                  <img src={logo} alt="Logo" />
                </div>
              )}
              <h1>{item}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
