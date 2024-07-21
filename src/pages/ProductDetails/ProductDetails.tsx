import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Rating, Star } from "@smastrom/react-rating";
import ProductDetailsSkeleton from "../../components/Skeleton/ProductDetailsSkeleton";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";
import { useEffect, useState } from "react";
import Magnifier from "react-magnifier";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { TProduct } from "../AllProducts/AllProducts";
import toast from "react-hot-toast";
import { useUser } from "../../hooks/useUser";
import { addCart, selectCart } from "../../redux/features/cart/cartSlice";
import { Helmet } from 'react-helmet-async';



export default function ProductDetails() {
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const {pathname} = useLocation()
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const { data, isFetching, isLoading ,refetch} = useGetSingleProductQuery(id);

  const product = data?.data as TProduct;

  const cart = useAppSelector(selectCart);

  const navigate = useNavigate();

  const { user } = useUser();
  const role = user?.role;
  console.log(data)
  useEffect(() => {
    if (product?.images) {
      if (!image) {
        setImage(product?.images[0]);
      }
    }
  }, [product]);

  useEffect(()=>{
    if(product){
      refetch()
    }
  },[])

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value));

    if (product.stock >= value) {
      setQuantity(value);
    } else {
      toast.error("Sorry not enough in stock!");
    }
  };

  const addToCart = () => {

    if(!user){
      navigate("/login",{state:pathname})
    }else{
       const { name, price } = product;

       dispatch(
         addCart({
           _id: product._id as string,
           name,
           image,
           price,
           quantity,
         })
       );
       toast.success(`Successfully added ${name} to the cart`);

       if (cart.length >= 3) {
         toast((t) => (
           <div className="text-foreground bg-background p-2 rounded-xl">
             <span> You have {cart.length + 1} items on your cart</span>
             <div className="flex gap-2 mt-2">
               <Button variant="outline" onClick={() => toast.dismiss(t.id)}>
                 Continue Shopping
               </Button>
               <Button
                 variant="ghost"
                 onClick={() => {
                   navigate("/dashboard/cart");
                   toast.dismiss(t.id);
                 }}
               >
                 Cart
               </Button>
             </div>
           </div>
         ));
       }

       navigate("/all-products");
    }

   
  };

  return (
    <div className="min-h-screen pt-10">
      {isFetching || isLoading ? (
        <ProductDetailsSkeleton />
      ) : (
        <div className="grid text-foreground md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
          <div className="flex flex-col gap-4">
            <Helmet>
              <title>{product?.name}</title>
             
            </Helmet>
            <Magnifier
              src={image}
              mgShape="square"
              mgShowOverflow={false}
              zoomFactor={1.5}
              style={{
                width: "24rem",
                height: "24rem",
                objectFit: "contain",
              }}
            />
            <div className="grid grid-cols-4 gap-4">
              {product?.images?.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setImage(img)}
                  className={`border ${
                    image === img ? "opacity-50" : ""
                  } hover:border-gray-500 rounded-lg overflow-hidden transition-all`}
                >
                  <img
                    src={img}
                    alt="Preview thumbnail"
                    className="aspect-square object-cover"
                  />
                  <span className="sr-only">View Image {i + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <span className="font-extralight">{product.category}</span>
              <div className="flex items-center gap-2">
                <Rating
                  style={{ maxWidth: 100 }}
                  value={product?.ratings}
                  readOnly
                />
                <span className="text-sm text-muted-foreground">
                  {product?.ratings}
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    product.stock >= 1 ? "bg-black" : "bg-red-400"
                  } text-white px-2 py-1 rounded-md text-sm font-medium`}
                >
                  {product.stock >= 1
                    ? `${product.stock} In Stock`
                    : "Out of Stock"}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.sales} sold
                </span>
              </div>
              <p className="text-lg font-bold">${product?.price}</p>
              <p className="text-muted-foreground">{product?.description}</p>
            </div>
            {role !== "admin" ? (
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantity" className="text-base">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-24 font-bold"
                  />
                </div>
                <Button
                  disabled={!product.stock >= 1}
                  type="button"
                  onClick={addToCart}
                  size="lg"
                >
                  Add to cart
                </Button>
              </form>
            ) : (
              <>
                <Link to={`/dashboard/edit-product/${product._id}`}>
                  <Button
                    type="button"
                    variant="outline"
                    className="border animate-pulse hover:animate-none"
                    size="lg"
                  >
                    Edit This Product
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
