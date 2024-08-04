import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  clearCheckout,
  TCheckout,
} from "../redux/features/checkout/checkoutSlice";
import { useAppDispatch } from "../redux/hooks";
import { useAddCartMutation } from "../redux/features/cart/cartApi";
import toast from "react-hot-toast";
import { clearCart } from "../redux/features/cart/cartSlice";
import axios from "axios";
import { useUser } from "./useUser";

const useAddCartToDB = () => {
  const [queries, setQueries] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [addCartToDataBase] = useAddCartMutation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { token } = useUser();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const addCart = async (cartData: TCheckout) => {
    const data = await axios.get(`${baseUrl}/carts/${cartData.paymentId}`, {
      withCredentials: true,
      headers: { authorization: token },
    });
    setLoading(true);
    setSuccess(false);
    dispatch(clearCheckout());
    try {
      const saveCart = async (cartData: TCheckout) => {
        const res = (await addCartToDataBase(cartData)) as any;

        if (res.data.success) {
          dispatch(clearCart());
          dispatch(clearCheckout());
          const payment_id = queries.get("payment_id");
          if (payment_id) {
            const newQueries = new URLSearchParams(queries.toString());

            newQueries.delete("payment_id");

            navigate({ search: newQueries.toString() }, { replace: true });
          }
          setSuccess(true);
        } else {
          throw new Error(res.error?.message || "Save failed");
        }
        return res;
      };

      if (!data?.data?.data?._id) {
        await toast.promise(saveCart(cartData), {
          loading: "Saving Cart...",
          success: "Cart saved!",
          error: (err) => <p>{err.message || "Could not save."}</p>,
        });
      }
    } catch (err) {
      setSuccess(false);
      console.error("Error saving cart:", err);
    } finally {
      setLoading(false);
    }
  };

  return { addCart, loading, success };
};

export default useAddCartToDB;
