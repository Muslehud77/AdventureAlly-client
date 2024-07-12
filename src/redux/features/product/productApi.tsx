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
          url: "/products",
        };
      },
    }),
    getSingleProduct: builder.query({
      query: (_id) => `/products/${_id}`,
    }),
    getBestSelling: builder.query({
      query: () => `/products/best-selling`,
    }),
    getRandomThree: builder.query({
      query: () => `/products/random-products`,
    }),

    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: `/products/${_id}`,
        method: "DELETE",
      }),
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: `/products`,
        method: "POST",
        body: productData,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({_id,productData}) => ({
        url: `/products/${_id}`,
        method: "PATCH",
        body: productData,
      }),
    }),
    getDeletedProducts: builder.query({
      query: () => `/products/deleted-products`,
    }),
  }),
});

export const { useCreateProductMutation,useUpdateProductMutation,useGetSingleProductQuery,useGetAllProductsQuery,useGetBestSellingQuery,useGetRandomThreeQuery,useDeleteProductMutation,useGetDeletedProductsQuery } = productApi;
