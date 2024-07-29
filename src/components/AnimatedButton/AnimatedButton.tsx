import { FaArrowRight } from "react-icons/fa6";

import { Link } from "react-router-dom";

type AnimatedButtonProps = {
  route?: string;
  title: string;
  justify?: string;
};

const AnimatedButton = ({ route, title, justify }: AnimatedButtonProps) => {

    
    

  return (
    <div
      className={`w-full flex ${
        justify ? `justify-${justify}` : "justify-center"
      }  items-center pt-5`}
    >
      <Link
        to={route as string}
        className="bg-background py-3 px-5 pr-8 relative group uppercase rounded overflow-hidden "
      >
        <div className="absolute bg-black dark:bg-white overflow-hidden text-white dark:text-black text-center w-full h-full duration-500 inset-0 flex justify-center items-center pr-3 translate-y-44 rotate-45 group-hover:translate-y-0 group-hover:rotate-0">
          <span>{title}</span>
        </div>
        {title}
        <span className="absolute bg-black text-white dark:bg-white dark:text-black overflow-hidden top-2 right-2 group-hover:top-0 group-hover:right-0 duration-500 w-1 h-1 group-hover:size-7  group-hover:p-2 group-hover: rounded-full group-hover:-rotate-45 flex justify-center items-center">
          <FaArrowRight className="hidden group-hover:block" />
        </span>
      </Link>
    </div>
  );
};

export default AnimatedButton;