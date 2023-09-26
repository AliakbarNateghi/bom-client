import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";

const axiosBaseQuery = ({ cookies }) => async ({ url, method, data, params }) => {
  try {
    const headers = {
      Accept: "application/json"
    }

    if (typeof window === 'undefined') {
      // We are on the server
      headers.Cookie = `access_token=${cookies.get('access_token')}`;
    }
    
    const result = await axios({ 
      url: "http://localhost:8000/api/" + url, 
      method, 
      data, 
      params,
      withCredentials: true,
      headers,
    });
    return { data: result.data };
  } catch (error) {
    return { error };
  }
};


export const api = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  endpoints: (builder) => ({
    // Define a POST API
    createPost: builder.mutation({
      query: (body) => ({
        url: `user-info`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    // Define a GET API
    getProf: builder.query({
      query: () => `users-info`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'users', id })) : [],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreatePostMutation,
  useGetPostsQuery,
  util: { getFetchingPostsQuery },
} = api;

// Export endpoints for use in SSR
export const { createPost, getProf } = api.endpoints;