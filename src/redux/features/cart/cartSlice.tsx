import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import toast from "react-hot-toast";

export interface TCart {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  stock: number;
}

type TState = {
  cart: TCart[];
};

const initialState: TState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<TCart>) => {
      const isExist = state.cart.find((c) => c._id === action.payload._id);
      if (!isExist) {
        state.cart.push(action.payload);
      } else {
        state.cart = state.cart.map((c) => {
          if (c._id === isExist._id) {
            c.quantity += action.payload.quantity;
          }

          return c;
        });
      }
    },
    removeACart: (state, action: PayloadAction<{ _id: string }>) => {
      state.cart = state.cart.filter((c) => c._id !== action.payload._id);
    },

    increaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      state.cart = state.cart.map((c) => {
        if (c._id === action.payload._id) {
          if (c.stock >= c.quantity + 1) {
            c.quantity += 1;
          }else{
            toast.error("Not enough in stock")
          }
        }
        return c;
      });
    },

    decreaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      state.cart = state.cart.map((c) => {
        if (c._id === action.payload._id) {
          if (c.quantity > 1) {
            c.quantity -= 1;
          }
        }
        return c;
      });
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addCart,
  removeACart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart.cart;
