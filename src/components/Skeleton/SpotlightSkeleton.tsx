
import { FaArrowRight } from "react-icons/fa6";
import { Skeleton } from "../ui/skeleton";

const SpotlightSkeleton = () => {
  const skeletonItems = [1, 2, 3]; // Number of skeleton items to display

  return (
    <div className="h-full text-foreground bg-background rounded-t-3xl">
      <div className="container mx-auto py-10">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <Skeleton className="h-10 w-1/2 mb-2" />
            <Skeleton className="h-1 w-20" />
          </div>
          <Skeleton className="h-20 w-full lg:w-1/2" />
        </div>
        <div className="flex flex-wrap w-full justify-between items-center text-white">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="h-[40vh] w-96 relative rounded-xl bg-gray-700 overflow-hidden animate-pulse"
            >
              <div className="h-full w-full bg-gray-800 absolute inset-0">
                <div className="h-full flex flex-col justify-between">
                  <div className="flex justify-end p-5">
                    <span className="bg-gray-700 rounded-full p-2">
                      <FaArrowRight className="text-gray-600" />
                    </span>
                  </div>

                  <div className="bg-gradient-to-b from-transparent to-gray-800 p-5 space-y-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="flex gap-1 items-center">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpotlightSkeleton;
