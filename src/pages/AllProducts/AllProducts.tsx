import { useEffect, useState, useRef } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import SearchAndFiltering from "./SearchAndFiltering";
import { Paginate } from "../../components/Pagination/Pagination";
import SkeletonCards from "../../components/Skeleton/SkeletonProducts";

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

type TQuery = {
  searchTerm?: string;
  page: number;
  limit: number;
  sort?: string;
  priceRange?: number;
  category?: string;
};

export default function AllProducts() {
  
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<TQuery>({ page, limit: 8 });
  const [sort, setSort] = useState("");
  const [range, setRange] = useState([0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
     
      return;
    }


    const handler = setTimeout(() => {
      let categories = "";
       
      if (selectedCategories.length > 0) {
        selectedCategories.forEach((c, index) => {
          categories += c;
          if (index < selectedCategories.length - 1) {
            categories += ",";
          }
        });
      }

      const query: TQuery = {
        page,
        limit: 8,
      };

      if (searchTerm) {
        query["searchTerm"] = searchTerm;
      }

      if (sort) {
        query["sort"] = sort;
      }

      if (range[0] > 0) {
        query["priceRange"] = range[0];
      }

      if (categories) {
        query["category"] = categories;
        if(filter.category !== categories){
           query["page"] = 0;
        }
      }

      if(filter!==query){
         setFilter(query);
         window.scrollTo({ top: 0, behavior: "smooth" });
      }
      
      
    }, 1000);

   
    return () => {
      clearTimeout(handler);
    };
  }, [page, sort, range, searchTerm, selectedCategories]);

  const { data, isLoading, isFetching} = useGetAllProductsQuery(filter);
  // console.log(data);
  const products = data?.data;
  const meta = data?.meta;

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    setRange([0]);
    setSort("");
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
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

      {isLoading || isFetching ? (
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
