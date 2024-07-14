import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/users`,
        };
      },
    }),
  
    deleteUser: builder.mutation({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: "DELETE",
      }),
    }),

    updateUser: builder.mutation({
      query: (userData) => ({
        url: `/users`,
        method: "PATCH",
        body: userData,
      }),
    }),
    
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation
} = usersApi;
