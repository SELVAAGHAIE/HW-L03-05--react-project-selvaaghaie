import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:3010";
const BOOKS_ENDPOINT = "/api/books";
const AUTH_ENDPOINT = "/api/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (build) => ({
    fetchBooks: build.query({
      query: () => BOOKS_ENDPOINT,
      providesTags: ["Books"],
    }),
    fetchBookById: build.query({
      query: (id) => `${BOOKS_ENDPOINT}/${id}`,
      providesTags: (id) => [{ type: "Books", id }],
    }),
    addBook: build.mutation({
      query: (book) => ({
        url: BOOKS_ENDPOINT,
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    editBook: build.mutation({
      query: ({ id, ...book }) => ({
        url: `${BOOKS_ENDPOINT}/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    removeBook: build.mutation({
      query: (id) => ({
        url: `${BOOKS_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    loginUser: build.mutation({
      query: (credentials) => ({
        url: `${AUTH_ENDPOINT}/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: build.mutation({
      query: (userData) => ({
        url: `${AUTH_ENDPOINT}/register`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useFetchBooksQuery,
  useFetchBookByIdQuery,
  useAddBookMutation,
  useEditBookMutation,
  useRemoveBookMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} = booksApi;
