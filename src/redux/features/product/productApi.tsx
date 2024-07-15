import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (filter) => {
        const params = new URLSearchParams();

        if (filter) {
          Object.entries(filter).forEach(([key, value]) => {
            params.append(key, value as string);
          });
        }

        return {
          url: `/products?${params.toString()}`,
        };
      },
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (_id) => ({ url: `/products/${_id}`, providesTags: ["product"] }),
    }),
    getBestSelling: builder.query({
      query: () => ({ url: `/products/best-selling` }),
    }),
    getRandomThree: builder.query({
      query: () => ({ url: `/products/random-products` }),
    }),

    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: `/products/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products", "product"],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: `/products`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["products", "product"],
    }),
    updateProduct: builder.mutation({
      query: ({ _id, productData }) => ({
        url: `/products/${_id}`,
        method: "PATCH",
        body: productData,
      }),
      invalidatesTags: ["products", "product"],
    }),
    getDeletedProducts: builder.query({
      query: () => ({url:`/products/deleted-products`}),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetSingleProductQuery,
  useGetAllProductsQuery,
  useGetBestSellingQuery,
  useGetRandomThreeQuery,
  useDeleteProductMutation,
  useGetDeletedProductsQuery,
} = productApi;
