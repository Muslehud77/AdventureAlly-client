
import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        getAllCarts : builder.query({
            query : ()=> "/carts"
        }),
        myCarts : builder.query({
            query: ()=> "/my-cart"
        }),
        addCart : builder.mutation({
            query: (cartData)=>({
                url: "/carts",
                method: "POST",
                body: cartData
            })
        }),
        changeStatus: builder.mutation({
            query : ({_id,status})=>({
                url: `/carts/${_id}/${status}`,
                method : "PATCH"
            })
        })
    })
})

export const {useGetAllCartsQuery,useMyCartsQuery,useAddCartMutation,useChangeStatusMutation} = cartApi