import { Card, CardHeader, CardContent } from "../../components/ui/card";
import {
  useAddCartMutation,
  useMyCartsQuery,
} from "../../redux/features/cart/cartApi";
import { TProduct } from "../AllProducts/AllProducts";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button"; // Assuming you have a Button component
import MyCartSkeleton from "../../components/Skeleton/MyCartSkeleton";
import { convertTimestamp } from "../../utils/convertTimeStamp";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearCheckout,
  selectCheckout,
  TCheckout,
} from "../../redux/features/checkout/checkoutSlice";
import useAddCartToDB from "../../hooks/useAddCartToDB";
import { useEffect, useState } from "react";

type TOrders = {
  address: string;
  createdAt: string;
  orders: { product: TProduct; quantity: number }[];
  phone: string;
  status: string;
  _id: string;
}[];

export default function MyOrders() {
  const { addCart, loading, success } = useAddCartToDB();
  const [cartUploadInit, setCartUploadInit] = useState(false);
  
  const { data, isLoading, isFetching } = useMyCartsQuery(undefined);
  const [queries] = useSearchParams();
  const orders = data?.data as TOrders;

  const checkout = useAppSelector(selectCheckout) as TCheckout;

  const payment_id = queries.get("payment_id");

  useEffect(() => {
    const uploadCart = ()=>{
     

      if (payment_id && Object.keys(checkout).length  && !cartUploadInit) {
        
        const addCartToDB = async (checkOut: TCheckout) => {
          (await addCart(checkOut)) as any;
          setCartUploadInit(true);
          queries.delete("payment_id");
        };

        const checkOut = {
          ...checkout,
          paymentId: payment_id,
          paymentMethod: "stripe",
        } as TCheckout;

        addCartToDB(checkOut);
      }
    }

    return ()=> uploadCart()
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {loading || isLoading ? (
        <MyCartSkeleton />
      ) : (
        <div className="grid gap-6">
          {orders?.length ? (
            orders.map((order, i) => (
              <Card key={order._id}>
                <CardHeader className="flex items-center justify-between">
                  <div className="font-semibold">Order #{i + 1}</div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "delivering"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.status}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">Products</h3>
                      <ul className="grid gap-2 mt-2">
                        {order.orders.map((product, index: number) => (
                          <li
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div>{product.product.name}</div>
                            <div>x{product.quantity}</div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Payment Details</h3>
                      <div className="grid gap-2 mt-2">
                        <div className="flex items-center justify-between">
                          <div>Payment Type</div>
                          <div className="capitalize">
                            {order?.paymentMethod
                              ? order?.paymentMethod
                              : "on-delivery"}
                          </div>
                        </div>
                        <div className="flex items-center justify-between ">
                          <div>Payment Id</div>
                          <div>{order.paymentId ? order.paymentId : "N/A"}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Order Details</h3>
                      <div className="grid gap-2 mt-2">
                        <div className="flex items-center justify-between">
                          <div>Order Date:</div>
                          <div>{convertTimestamp(order.createdAt)}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>Shipping Address:</div>
                          <div>{order.address}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center flex flex-col justify-center items-center h-96 ">
              <p className="text-xl font-semibold mb-4">
                Oh no! You have no orders yet. Seems like your cart is feeling
                lonely.
              </p>
              <Link to="/all-products">
                <Button size="lg" variant="destructive">
                  Go to All Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
