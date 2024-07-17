import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm, FieldValues } from "react-hook-form";
import SvgLoading from "../SvgLoading/SvgLoading";

type CartFormProps = {
    loading:boolean;
    error:string;
  isCartAvailable: boolean;
  register: ReturnType<typeof useForm>["register"];
  setValue: (name: string, value: string) => void;
  address: string | undefined;
  phoneNumber: string | undefined;
  paymentMethod: "on-delivery" | "stripe";
  setPaymentMethod: (method: "on-delivery" | "stripe") => void;
  grandTotal: number;
  errors: {
    address?: {
      message?: string;
    };
    phone?: {
      message?: string;
    };
    [key: string]: any;
  };
  handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
  onSubmit: (data: FieldValues) => void;
};

const CartForm = ({
    loading,
    error,
  isCartAvailable,
  register,
  setValue,
  address,
  phoneNumber,
  paymentMethod,
  setPaymentMethod,
  grandTotal,
  errors,
  handleSubmit,
  onSubmit,
}: CartFormProps) => {
  return (
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
      <div className="grid gap-1">
        <label className="text-lg font-semibold">Payment Method</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="delivery"
              checked={paymentMethod === "on-delivery"}
              onChange={() => setPaymentMethod("on-delivery")}
              disabled={isCartAvailable}
            />
            Payment on Delivery
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
              disabled={isCartAvailable}
            />
            Stripe
          </label>
        </div>
      </div>
      {error && (
        <p className="text-center text-red-500 font-semibold text-xl">
          {error}
        </p>
      )}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="grid gap-1">
          <h2 className="text-xl font-bold">Grand Total</h2>
          <p className="text-2xl font-semibold">${grandTotal.toFixed(2)}</p>
        </div>
        <Button
          type="submit"
          disabled={isCartAvailable || loading}
          size="lg"
          className="md:ml-auto"
        >
          {loading && <SvgLoading />}
          Proceed to Checkout
        </Button>
      </div>
    </form>
  );
};

export default CartForm;
