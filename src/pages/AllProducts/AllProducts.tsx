


import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import SearchAndFiltering from "./SearchAndFiltering";

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
  const [filter,setFilter] = useState({})
  const [priceSort,setPriceSort] = useState()

  const { data, isLoading } = useGetAllProductsQuery(filter);
  const products = data?.data
  

  useEffect(()=>{},[])


 
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
     <SearchAndFiltering/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product : TProduct) => <ProductCard key={product._id} product={product}/>)}
      </div>
    
    </div>
  );
}

