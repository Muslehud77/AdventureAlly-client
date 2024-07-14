import { TCart } from "../../redux/features/cart/cartSlice";
import { Button } from "../ui/button";


type TCartCard = {
  carts: TCart[];
  removeFromCart : (_id:string) => void
}

const CartCard = ({ carts, removeFromCart }: TCartCard) => {
  return (
    <div className="grid gap-8 border rounded-lg p-4">
      {carts.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-[100px_1fr_100px] items-center gap-4 border rounded-lg p-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="rounded-lg object-cover size-40"
          />
          <div className="grid gap-1">
            <h3 className="font-semibold">{item.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              <span className="font-semibold">{item.quantity}</span>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end gap-3 ">
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