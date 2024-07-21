import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Cursor = ({main}) => {
    
    const cursor = useRef(null)
    const {contextSafe} = useGSAP({scope:cursor})

  


  return (
    <div ref={cursor}  className="fixed rounded-full size-8 bg-white">
        
    </div>
  );
};

export default Cursor;