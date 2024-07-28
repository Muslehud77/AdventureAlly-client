import { Link } from "react-router-dom";
import { useGetBestSellingQuery } from "../../redux/features/product/productApi";
import CustomerFavoriteCardsSkeleton from "../Skeleton/CustomerFavouritesSkeleton";
import { CustomerFavoriteCards } from "./CustomerFavouriteCards";
import { FaArrowRight } from "react-icons/fa6";
import useCursorResize from "../../hooks/useCursorResize";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

const CustomerFavorites = () => {
    const {mouseLeaveCursorResize} = useCursorResize()
    const {data,isLoading} = useGetBestSellingQuery(undefined)

 

  return (
    <div className="h-full text-foreground rounded-t-3xl outline">
      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row-reverse w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0 flex flex-col items-end">
            <h1 className="text-3xl md:text-5xl font-light mb-2">
              Customer Favorites
            </h1>
            <div className="h-1 w-20 bg-secondary-foreground rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-xl font-light">
            Explore our Customer Favorites, featuring top-selling camping gear
            loved by our community. Discover must-have equipment for your next
            adventure!
          </p>
        </div>

        {isLoading ? (
          <CustomerFavoriteCardsSkeleton />
        ) : (
          <CustomerFavoriteCards products={data?.data} />
        )}
        <AnimatedButton route="/all-products" title="all products"/>
      </div>
    </div>
  );
};

export default CustomerFavorites;