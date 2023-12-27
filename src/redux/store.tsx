import { configureStore } from "@reduxjs/toolkit";
import mandateReducer from "./mandateSlice";

export const store = configureStore({
  reducer: {
    mandate: mandateReducer,
  },
});
