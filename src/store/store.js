import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import filtersReducer from "./slices/filtersSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filtersReducer,
    theme: themeReducer,
  },
});
