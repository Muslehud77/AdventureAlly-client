import { useState } from "react";

import { useAppSelector } from "../../redux/hooks";
import { removeACart, selectCart } from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";

import { useUser } from "../../hooks/useUser";
import CartCard from "../../components/Cart/CartCard";

import toast from "react-hot-toast";

import { usePaymentMutation } from "../../redux/features/cart/cartApi";

import CartHeadWithData from "../../components/Cart/CartHead";
import {
  addCheckout,
  TCheckout,
} from "../../redux/features/checkout/checkoutSlice";
import CartForm from "../../components/Cart/CartForm";

import { useUpdateUser } from "../../hooks/useUpdateUser";
import useAddCartToDB from "../../hooks/useAddCartToDB";

export type TItems = {
  product: string;
  quantity: number;
  totalAmount: number;
  image?: string;
};

export default function Cart() {
  const { addCart } = useAddCartToDB();
  const { updateUser, updatingUser } = useUpdateUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const carts = useAppSelector(selectCart);
  const dispatch = useDispatch();
  const { user } = useUser();

  const [paymentResponse] = usePaymentMutation();

  const phoneNumber = user?.phone;
  const address = user?.address;

  const [paymentMethod, setPaymentMethod] = useState<"on-delivery" | "stripe">(
    "stripe"
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const removeFromCart = (_id: string) => {
    dispatch(removeACart({ _id }));
  };

  const grandTotal = carts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const onSubmit = async (data: FieldValues) => {
    setError("");
    setLoading(true);

    const cartDataForDataBase: TCheckout = {
      user: user?._id as string,
      address: data.address as string,
      phone: data.phone as string,
      paymentMethod,
      orders: carts.map((c) => {
        const orderItem = {
          product: c._id as string,
          quantity: c.quantity as number,
          totalAmount: Number((c.price * c.quantity).toFixed(2)) as number,
        };

        if (paymentMethod === "stripe") {
          return {
            ...orderItem,
            name: c.name as string,
            image: c.image as string,
          };
        }

        return orderItem;
      }),
    };

    if (paymentMethod !== "on-delivery") {
      const res = await paymentResponse(cartDataForDataBase);
      dispatch(addCheckout(cartDataForDataBase));

      if (res.data.data.url) {
        window.open(res.data.data.url, "_blank");
        setLoading(false);
      } else {
        setLoading(false);
        setError("Something went wrong");
        toast.error(error);
      }
    } else {
      const res = (await addCart(cartDataForDataBase)) as any;
      if (res?.data) {
        setLoading(false);
      } else {
        setLoading(false);
        setError(res?.error.message);
      }
    }

    const userDataForUpdatingTheUser = {} as {
      address?: string;
      phone?: string;
    };

    if (!phoneNumber) {
      userDataForUpdatingTheUser["phone"] = data?.phone;
    }

    if (!address) {
      userDataForUpdatingTheUser["address"] = data?.address;
    }

    if (Object.keys(userDataForUpdatingTheUser).length) {
      await updateUser(userDataForUpdatingTheUser, true);
    }
  };

  const isCartAvailable = !carts?.length || updatingUser;

  return (
    <section className="w-full py-12 border rounded-lg">
      <div className="container grid gap-6 md:gap-8 px-4 py-10 md:px-6 border rounded-lg">
        <CartHeadWithData carts={carts} />
        <CartCard carts={carts} removeFromCart={removeFromCart} />
        <div className="grid gap-4 border-t pt-8">
          <CartForm
            loading={loading}
            error={error}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isCartAvailable={isCartAvailable}
            register={register}
            setValue={setValue}
            address={address}
            phoneNumber={phoneNumber}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            grandTotal={grandTotal}
            errors={errors}
          />
        </div>
      </div>
    </section>
  );
}
