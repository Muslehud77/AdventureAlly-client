import { useEffect } from "react";
import Contact from "./Contact";
import MeetOurTeam from "./MeetOurTeam";
import scrollToTop from "../../utils/scrollToTop";
import GetInTouch from "./GetInTouch";

const About = () => {

  useEffect(()=>{
    scrollToTop()
  },[])

  return (
    <>
     <MeetOurTeam/>
     <Contact/>
     <GetInTouch/>
    </>
  );
};

export default About;