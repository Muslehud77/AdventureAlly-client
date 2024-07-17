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
import { selectCheckout, TCheckout } from "../../redux/features/checkout/checkoutSlice";
import useAddCartToDB  from "../../hooks/useAddCartToDB";
import { useEffect } from "react";

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

  
  const { data, isLoading, isFetching } = useMyCartsQuery(undefined);
  const [queries] = useSearchParams();
  const orders = data?.data as TOrders;

  const checkoutItems = useAppSelector(selectCheckout);

  const payment_id = queries.get("payment_id");


  useEffect(()=>{
    console.log("hello111");
  if (payment_id && checkoutItems && !loading) {
    console.log({ payment_id, checkoutItems, loading });
    console.log("hello222");
    const checkOut = {
      ...checkoutItems,
      paymentId: payment_id,
      paymentMethod: "stripe",
    } as TCheckout;
    addCart(checkOut);
  }


  },[])

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {isLoading || isFetching ? (
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
