import { configureStore } from "@reduxjs/toolkit/react";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import checkoutReducer from "./features/checkout/checkoutSlice";
import cursorReducer from "./features/cursor/cursorSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";

const persistAuthConfig = {
  key: "auth",

  storage,
};

const persistCheckoutConfig = {
  key: "checkout",

  storage,
};

const persistCartConfig = {
  key: "cart",

  storage,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistCheckoutReducer = persistReducer(
  persistCheckoutConfig,
  checkoutReducer
);

const persistCartReducer = persistReducer(persistCartConfig, cartReducer);


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: persistCartReducer,
    checkout: persistCheckoutReducer,
    cursor: cursorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
