import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendApiSlice = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ["UserFavorite", "UserSearchHistory"], // Custom tag types
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
    addtoFavorite: builder.mutation({
      query: (favorite) => ({
        url: `/v1/favorite/${favorite.id}`,
        method: "POST",
        body: favorite,
      }),
      invalidatesTags: ["UserFavorite"], // Invalidate the relevant query
    }),
    getFavorite: builder.query({
      query: () => ({
        url: "/v1/favorite",
        method: "GET",
      }),
      providesTags: ["UserFavorite"], // Provide a tag for invalidation
    }),
    removeFromFavorite: builder.mutation({
      query: (id) => ({
        url: `/v1/favorite/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserFavorite"], // Invalidate the relevant query
    }),
    getSearchHistory: builder.query({
      query: () => ({
        url: "/v1/search/history",
        method: "GET",
      }),
      providesTags: ["UserSearchHistory"], // Provide a tag for invalidation
    }),
    deleteSearchHistory: builder.mutation({
      query: (id) => ({
        url: `/v1/search/history/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserSearchHistory"], // Invalidate the relevant query
    }),
    searchContent: builder.mutation({
      query: ({ contentType, query }) => ({
        url: `/v1/search/${contentType}/${query}`,
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
  useGetDetailQuery,
  useAddtoFavoriteMutation,
  useGetFavoriteQuery,
  useRemoveFromFavoriteMutation,
  useGetSearchHistoryQuery,
  useDeleteSearchHistoryMutation,
  useSearchContentMutation,
} = backendApiSlice;
