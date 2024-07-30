import { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import ManageProductsSkeleton from "../../components/Skeleton/ManageProductsSkeleton";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { Paginate } from "../../components/Pagination/Pagination";
import { convertTimestamp } from "../../utils/convertTimeStamp";
import DeleteProduct from "../../components/DeleteProduct/DeleteProduct";
import scrollToTop from "../../utils/scrollToTop";
import { Link } from "react-router-dom";
import { TProduct } from "../AllProducts/AllProducts";
import { Helmet } from "react-helmet-async";

type TQuery = {
  searchTerm?: string;
  page: number;
  limit: number;
  sort?: string;
  priceRange?: number;
  category?: string;
};

export default function ManageProducts() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TQuery>({ page, limit: 8 });
 

  const { data, isLoading, isFetching, isError } =
    useGetAllProductsQuery(filter);

  const meta = data?.meta;

  

  useEffect(() => {
    const handler = setTimeout(() => {
      const query: TQuery = {
        page,
        limit: 8,
      };

      if (searchTerm) {
        query["searchTerm"] = searchTerm;
      }

      if (filter !== query) {
        setFilter(query);
        scrollToTop();
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, page]);


  const products = data?.data

  return (
    <div className="px-8 mx-auto py-6 border dark:border-none rounded-xl text-foreground bg-secondary mb-10">
      <Helmet>
        <title>Dashboard | Manage Products</title>
      </Helmet>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Manage Products</h1>

        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md bg-background"
          />
        </div>
      </div>
      {isLoading || isFetching || isError || !data ? (
        <ManageProductsSkeleton />
      ) : (
        <>
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {!isLoading &&
              !isFetching &&
              products?.map(
                (
                  product: TProduct & { createdAt: string; updatedAt: string }
                ) => (
                  <div
                    key={product._id}
                    className="bg-background rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={(product.images as string[])[0]}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-muted-foreground">
                        {product.category}
                      </p>

                      <p
                        className={`text-muted-foreground ${
                          product.stock <= 10 ? "bg-red-500 text-white p-2" : ""
                        }`}
                      >
                        {product.stock} in stock
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                          Last updated:{" "}
                          {product.updatedAt || product.createdAt
                            ? convertTimestamp(
                                product?.updatedAt || product.createdAt
                              )
                            : "N/A"}
                        </p>
                        <div className="flex gap-2">
                          <DeleteProduct
                            id={product._id as string}
                            isIcon={true}
                          />

                          <Link to={`/dashboard/edit-product/${product._id}`}>
                            <Button size="sm">
                              <FilePenIcon className="w-4 h-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
          {meta ? (
            <div className="mt-10">
              <Paginate setPage={setPage} meta={meta} />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

