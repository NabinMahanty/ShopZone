import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  selectedCategory: "all",
  minPrice: 0,
  maxPrice: 1000,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setMinPrice,
  setMaxPrice,
  resetFilters,
} = filtersSlice.actions;

export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;
