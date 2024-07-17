import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/features/cart/cartSlice";
import { clearCheckout, TCheckout } from "../redux/features/checkout/checkoutSlice";
import { useAppDispatch } from "../redux/hooks";
import { useAddCartMutation } from "../redux/features/cart/cartApi";
import toast from "react-hot-toast";

const useAddCartToDB = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [addCartToDataBase] = useAddCartMutation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log("here")

  const addCart = async (cartData: TCheckout) => {
    setLoading(true);
    setSuccess(false);

    try {
      const saveCart = async (cartData: TCheckout) => {
        const res = (await addCartToDataBase(cartData)) as any;
        if (res.data.success) {
          dispatch(clearCart());
          dispatch(clearCheckout())
          navigate("/dashboard/my-orders");
          setSuccess(true);
        } else {
          throw new Error(res.error?.message || "Save failed");
        }

        return res;
      };

      await toast.promise(saveCart(cartData), {
        loading: "Saving Cart...",
        success: "Cart saved!",
        error: (err) => <p>{err.message || "Could not save."}</p>,
      });
    } catch (err) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { addCart, loading, success };
};

export default useAddCartToDB;
