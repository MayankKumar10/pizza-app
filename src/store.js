import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./features/pizzaSlice";

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
  },
});
