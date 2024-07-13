import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      query: () => ({ url: "/carts" }),
      providesTags: ["cart"],
    }),

    myCarts: builder.query({
      query: () => ({ url: "/my-cart" }),
      providesTags: ["mycart"],
    }),
    addCart: builder.mutation({
      query: (cartData) => ({
        url: "/carts",
        method: "POST",
        body: cartData,
      }),
      invalidatesTags : ["mycart"]
    }),
    changeStatus: builder.mutation({
      query: ({ _id, status }) => ({
        url: `/carts/${_id}/${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["cart"]
    }),
  }),
});

export const {
  useGetAllCartsQuery,
  useMyCartsQuery,
  useAddCartMutation,
  useChangeStatusMutation,
} = cartApi;
