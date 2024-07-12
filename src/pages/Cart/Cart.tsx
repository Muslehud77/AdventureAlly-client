/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5SAxKiNKP2r
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";

export default function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Cozy Blanket",
      price: 29.99,
      quantity: 2,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Autumn Mug",
      price: 12.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Fall Fragrance Candle",
      price: 16.99,
      quantity: 3,
      image: "/placeholder.svg",
    },
  ]);
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  const clearCart = () => {
    setCart([]);
  };
  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <section className="w-full py-12 border rounded-lg">
      <div className="container grid gap-6 md:gap-8 px-4 py-10 md:px-6 border rounded-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 border-b pb-4">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">My Cart</h1>
            <p className="text-muted-foreground">
              Review and complete your order.
            </p>
          </div>
          <Button
            size="lg"
            variant="outline"
            className="md:ml-auto shrink-0"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </div>
        <div className="grid gap-8 border rounded-lg p-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[100px_1fr_100px] items-center gap-4 border rounded-lg p-4"
            >
              <img
                src="/placeholder.svg"
                alt={item.name}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              <div className="grid gap-1">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Quantity:
                  </span>
                  <span className="font-semibold">{item.quantity}</span>
                </div>
              </div>
              <div className="grid justify-end items-end gap-1 ">
                <span className="font-semibold">${item.price.toFixed(2)}</span>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <Button
                
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFromCart(item.id)}
                >
                  <XIcon className="w-5 h-5" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 border-t pt-8">
          <div className="grid gap-1">
            <h2 className="text-xl font-bold">Grand Total</h2>
            <p className="text-2xl font-semibold">${grandTotal.toFixed(2)}</p>
          </div>
          <Button size="lg" className="md:ml-auto">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </section>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
