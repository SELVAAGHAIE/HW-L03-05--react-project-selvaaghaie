import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../api/BooksApi";
const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

export default store;
