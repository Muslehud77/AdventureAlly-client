import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      query: () => ({ url: "/carts" }),
      providesTags: ["cart"],
    }),

    myCarts: builder.query({
      query: () => ({ url: "carts/my-cart" }),
      providesTags: ["mycart"],
    }),
    addCart: builder.mutation({
      query: (cartData) => ({
        url: "/carts",
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["mycart", "products", "product", "stats"],
    }),
    changeStatus: builder.mutation({
      query: ({ _id, status }) => ({
        url: `/carts/${_id}/${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["cart", "stats"],
    }),
    getStats: builder.query({
      query: () => ({
        url: `/carts/statistics`,
      }),
      providesTags: ["stats"],
    }),
    payment: builder.mutation({
      query: (products) => ({
        url: `/carts/payment`,
        body: products,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllCartsQuery,
  useMyCartsQuery,
  useAddCartMutation,
  useChangeStatusMutation,
  useGetStatsQuery,
  usePaymentMutation
} = cartApi;
