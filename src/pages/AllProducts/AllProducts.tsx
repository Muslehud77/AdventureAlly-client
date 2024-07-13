import { FormEvent, useEffect, useState } from "react";
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

export default function AllProducts() {
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [priceSort, setPriceSort] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOrder, setSortOrder] = useState("asc");

  const { data, isLoading } = useGetAllProductsQuery({ page, limit: 8 });
  console.log(data);
  const products = data?.data;
  const meta = data?.meta;

  const search = (e: FormEvent) => {
    console.log(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <SearchAndFiltering search={search} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <SkeletonCards />
        ) : (
          products?.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
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
