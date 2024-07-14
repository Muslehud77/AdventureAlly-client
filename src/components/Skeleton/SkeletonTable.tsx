import { Skeleton } from "../ui/skeleton";

const SkeletonTable = () => {

    const arr = [...Array(3).keys()].map((i) => i + 1);

  return (
    <div className="overflow-hidden">
      <div
        
        className="flex flex-col justify-center h-full items-center gap-5"
      >
        {arr.map((e) => (
          <>
            <Skeleton className="h-10 w-[90vw] " />
            <Skeleton className="h-2 w-[70vw]" />
          </>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;