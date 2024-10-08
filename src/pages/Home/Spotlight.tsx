
import { useGetRandomThreeQuery } from "../../redux/features/product/productApi";

import SpotlightProducts from "../../components/Spotlight/SpotlightProducts";
import AnimatedButton from "../../components/AnimatedButton/AnimatedButton";

const Spotlight = () => {
  

  const { data, isLoading ,isError} = useGetRandomThreeQuery(undefined, {
    pollingInterval: 10000,
  });

  

  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed=".1"
      className="h-full  text-foreground bg-background rounded-t-3xl pb-20"
    >
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
        <SpotlightProducts
          isLoading={isLoading}
          products={data?.data}
          isError={isError}
        />
        <AnimatedButton
          title="Want more?"
          route="/all-products"
          justify="end"
        />
      </div>
    </div>
  );
};

export default Spotlight;
