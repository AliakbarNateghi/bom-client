import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { api } from "./newapi";

export const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export const wrapper = createWrapper(makeStore, { debug: true });

export const store = makeStore(); // Create the store object

export const RootState = store.getState(); // Access the state using getState()
export const AppDispatch = store.dispatch; // Access the dispatch function
