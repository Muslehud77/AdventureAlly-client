import { Button } from "../../components/ui/button";
import { useAppSelector } from "../../redux/hooks";
import {
  clearCart,
  removeACart,
  selectCart,
} from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { ReactNode } from "react";
import { useUser } from "../../hooks/useUser";
import CartCard from "../../components/Cart/CartCard";

export default function Cart() {
  const carts = useAppSelector(selectCart);
  const dispatch = useDispatch();
  const { user } = useUser();

  const phoneNumber = user?.phone || "010";
  const address = user?.address || "Address";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const removeFromCart = (_id: string) => {
    dispatch(removeACart({ _id }));
  };
  const clearCartData = () => {
    dispatch(clearCart());
  };
  const grandTotal = carts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const onSubmit = (data) => {
    console.log(data);
    // Proceed with checkout process
  };

  const isCartAvailable = !carts?.length

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
          {!isCartAvailable && (
            <Button
              size="lg"
              variant="outline"
              className="md:ml-auto shrink-0"
              onClick={clearCartData}
            >
              Clear Cart
            </Button>
          )}
        </div>
        <CartCard carts={carts} removeFromCart={removeFromCart} />
        <div className="grid gap-4 border-t pt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-1">
              <label htmlFor="address" className="text-lg font-semibold">
                Address
              </label>
              <div className="flex gap-2">
                <Input
                  disabled={isCartAvailable}
                  placeholder="Put your delivery address here"
                  id="address"
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className={errors.address ? "border-red-500" : ""}
                />
                {address && (
                  <Button
                    disabled={isCartAvailable}
                    type="button"
                    variant="outline"
                    onClick={() => setValue("address", address)}
                  >
                    Use Saved Address
                  </Button>
                )}
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm">
                  {errors?.address?.message as ReactNode}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <label htmlFor="phone" className="text-lg font-semibold">
                Phone Number
              </label>
              <div className="flex gap-2">
                <Input
                  disabled={isCartAvailable}
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Phone number must be exactly 11 digits",
                    },
                  })}
                  className={errors.phone ? "border-red-500" : ""}
                />

                {phoneNumber && (
                  <Button
                    variant="outline"
                    disabled={isCartAvailable}
                    type="button"
                    onClick={() => setValue("phone", phoneNumber)}
                  >
                    Use Saved Phone Number
                  </Button>
                )}
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors?.phone?.message as ReactNode}
                </p>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="grid gap-1">
                <h2 className="text-xl font-bold">Grand Total</h2>
                <p className="text-2xl font-semibold">
                  ${grandTotal.toFixed(2)}
                </p>
              </div>
              <Button
                type="submit"
                disabled={isCartAvailable}
                size="lg"
                className="md:ml-auto"
              >
                Proceed to Checkout
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
