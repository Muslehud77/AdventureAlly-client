import { useEffect } from "react";
import Contact from "./Contact";
import MeetOurTeam from "./MeetOurTeam";
import scrollToTop from "../../utils/scrollToTop";

const About = () => {

  useEffect(()=>{
    scrollToTop()
  },[])

  return (
    <>
     <MeetOurTeam/>
     <Contact/>
    </>
  );
};

export default About;