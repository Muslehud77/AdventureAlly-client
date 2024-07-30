import { useEffect,useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";

import SearchAndFiltering from "./SearchAndFiltering";
import { Paginate } from "../../components/Pagination/Pagination";
import SkeletonCards from "../../components/Skeleton/SkeletonProducts";
import scrollToTop from "../../utils/scrollToTop";
import { Helmet } from "react-helmet-async";
import useAllProductsQuery from "../../hooks/useAllProductsQuery";

export type TProduct = {
  _id?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  ratings: number;
  isDeleted?: boolean;
  images?: string[];
  sales?: number;
};



export default function AllProducts() {
 
  const [searchParams] = useSearchParams();

  const {
    page,
    setPage,
    sort,
    setSort,
    range,
    setRange,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    setSelectedCategories,
    queryBuilder,
    product,
  } = useAllProductsQuery();

  const isInitialRender = useRef(true);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
   
    const pageParam = searchParams.get("page");
    const sortParam = searchParams.get("sort");
    const rangeParam = searchParams.get("priceRange");
    const searchTermParam = searchParams.get("searchTerm");
    const categoryParam = searchParams.get("category");
   


    if (isInitialRender.current) {
      isInitialRender.current = false;

      setPage(pageParam ? pageParam : "1");
      setSort(sortParam || "");
      setRange(rangeParam ? [Number(rangeParam)] : [0]);
      setSearchTerm(searchTermParam || "");
      setSelectedCategories(categoryParam ? categoryParam.split(",") : []);

    }


    if (
      pageParam ||
      sortParam ||
      rangeParam ||
      searchTermParam ||
      categoryParam
    ) {
      queryBuilder();
    } else {
      const handler = setTimeout(queryBuilder, 1000);

      return () => {
        clearTimeout(handler);
      };
    }

  
  }, [page, sort, range, searchTerm, selectedCategories]);

  const { data, isLoading, isFetching, isError } = product;

  const products = data?.data;
  const meta = data?.meta;

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    setRange([0]);
    setSort("");
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 text-foreground">
      <Helmet>
        <title>AdventureAlly | Products</title>
      </Helmet>
      <SearchAndFiltering
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        range={range}
        setRange={setRange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sort={sort}
        setSort={setSort}
        clearFilters={clearFilters}
      />

      {isLoading || isFetching || isError || !data ? (
        <SkeletonCards />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      {meta ? (
        <div className="mt-10">
          <Paginate setPage={setPage} meta={meta} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
