import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { clearCart, TCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";

type CartHeadWithDataProps = {
  carts: TCart[];
};

const CartHeadWithData = ({ carts }: CartHeadWithDataProps) => {
  const dispatch = useAppDispatch();

  const clearCartData = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 border-b pb-4">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">My Cart</h1>
        <p className="text-muted-foreground">
          {carts.length
            ? "Review and complete your order."
            : "You haven't added anything to the cart."}
        </p>
      </div>
      {carts.length ? (
        <Button
          size="lg"
          variant="outline"
          className="md:ml-auto shrink-0"
          onClick={clearCartData}
        >
          Clear Cart
        </Button>
      ) : (
        <div className="flex justify-end items-center w-full">
          <Link to="/all-products">
            <Button size="lg" variant="outline" className="md:ml-auto shrink-0">
              Lets Shop
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartHeadWithData;
