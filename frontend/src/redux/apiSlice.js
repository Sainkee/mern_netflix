import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
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
  }),
});

export const { useSignUpMutation, useLoginMutation } = backendApi;
