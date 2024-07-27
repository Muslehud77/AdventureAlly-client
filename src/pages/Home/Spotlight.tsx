import { Rating } from "@smastrom/react-rating";
import { useGetRandomThreeQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../AllProducts/AllProducts";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useCursorResize from "../../hooks/useCursorResize";

const Spotlight = () => {

    
  const { mouseLeaveCursorResize } = useCursorResize();

  const { data } = useGetRandomThreeQuery(undefined, {
    //   pollingInterval: 10000,
  });

  function truncateString(str: string) {
    if (str.length > 42) {
      return str.slice(0, 42) + "...";
    }
    return str;
  }

  return (
    <div className="h-full text-foreground bg-background rounded-t-3xl">
      <div className="container mx-auto py-10">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="text-3xl md:text-5xl font-light mb-2">
              Gear Spotlight
            </h1>
            <div className="h-1 w-20 bg-secondary-foreground rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-xl font-light">
            Explore our Gear Spotlight, where every{" "}
            <span className=" bg-accent-foreground text-background animate-pulse rounded px-2">
              10 seconds
            </span>{" "}
            we showcase new top-rated camping accessories. Discover quality gear
            to enhance your adventures. Don’t miss out - find your next
            must-have item today!
          </p>
        </div>
        <div className="flex flex-wrap w-full justify-between items-center text-white">
          {data?.data?.map((product: TProduct) => (
            <Link
              onClick={mouseLeaveCursorResize}
              to={`/product-details/${product._id}`}
              key={product._id}
              className="h-[40vh] w-96 relative rounded-xl bg-white overflow-hidden group"
            >
              <img
                className=" group-hover:scale-90 duration-300 w-full h-full object-contain bg-white"
                src={(product.images as string[])[0]}
              />
              <div className="h-full w-full bg-black/50 group-hover:bg-black/20 duration-300 absolute inset-0">
                <div className="h-full  flex flex-col justify-between">
                  <div className="flex justify-end p-5">
                    <span className="bg-black duration-500 opacity-0 group-hover:opacity-100 group-hover:p-2 rounded-full group-hover:-rotate-45">
                      <FaArrowRight />
                    </span>
                  </div>

                  <div
                    className="bg-gradient-to-b group-hover:translate-y-56 from-transparent to-black gradient p-5 
                  duration-700 space-y-1"
                  >
                    <h1 className="text-2xl font-semibold">{product.name}</h1>
                    <p className="font-thin">
                      {truncateString(product.description)}
                    </p>
                    <div className="flex gap-1 items-center">
                      <Rating
                        style={{ maxWidth: 80 }}
                        value={product?.ratings}
                        readOnly
                      />
                      <span className="font-thin">({product.ratings})</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
