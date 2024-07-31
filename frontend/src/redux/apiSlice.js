import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getByCategory } from "../../../backend/controller/movie.controller";

export const backendApiSlice = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: `/v1/user/register`,
        method: "POST",

        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: `/v1/user/login`,
        method: "POST",
        body: userData,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `/v1/user/logout`,
        method: "POST",
      }),
    }),

    trending: builder.query({
      query: (param) => ({
        url: `/v1/${param}`,
        method: "GET",
      }),
    }),

    getByCategory: builder.query({
      query: ({ category, contentType }) => `/v1/${contentType}/${category}`,
    }),
    getTrailer: builder.query({
      query: ({ contentType, id }) => ({
        url: `/v1/${contentType}/trailers/${id}`,
        method: "GET",
      }),
    }),
    getSimilar: builder.query({
      query: ({ contentType, id }) => ({
        url: `/v1/${contentType}/similar/${id}`,
        method: "GET",
      }),
    }),
    getDetail: builder.query({
      query: ({ contentType, id }) => ({
        url: `/v1/${contentType}/detail/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  useTrendingQuery,
  useGetByCategoryQuery,
  useGetTrailerQuery,
  useGetSimilarQuery,
  useGetDetailQuery
} = backendApiSlice;
