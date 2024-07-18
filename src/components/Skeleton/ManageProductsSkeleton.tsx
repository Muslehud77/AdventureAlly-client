import { Skeleton } from "../../components/ui/skeleton";

export default function ManageProductsSkeleton() {
  const skeletons = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          <Skeleton className="h-8 w-48" />
        </h1>
        <div className="relative">
          <Skeleton className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
          <Skeleton className="pl-10 pr-4 py-2 rounded-md h-10 w-64" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletons.map((index) => (
          <div
            key={index}
            className="bg-background rounded-lg shadow-md overflow-hidden"
          >
            <Skeleton className="w-full h-48 object-cover" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex items-center justify-between mt-4">
                <Skeleton className="h-4 w-1/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
