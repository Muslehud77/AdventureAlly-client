import { decreaseQuantity, increaseQuantity, TCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Button } from "../ui/button";

type TCartCard = {
  carts: TCart[];
  removeFromCart: (_id: string) => void;
  
};

const CartCard = ({
  carts,
  removeFromCart,
  
}: TCartCard) => {

  const dispatch = useAppDispatch()

  return (
    <div className="grid gap-8 border rounded-lg p-4">
      {carts.map((item) => (
        <div
          key={item._id}
          className="flex flex-col md:flex-row justify-between border rounded-lg p-4"
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="rounded-lg object-cover size-40"
            />
            <div className="grid gap-1">
              <h3 className="font-semibold">{item.name}</h3>
              <div className="flex items-center gap-2">
                <div className="flex gap-2 justify-center items-center">
                  <Button
                    variant="outline"
                    onClick={() =>
                      dispatch(decreaseQuantity({ _id: item._id }))
                    }
                  >
                    -
                  </Button>
                  <span className="font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      dispatch(increaseQuantity({ _id: item._id }))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end gap-3">
            <span className="font-semibold">${item.price.toFixed(2)}</span>
            <span className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <Button
              variant="secondary"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCard;
