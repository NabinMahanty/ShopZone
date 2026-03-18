import { createSlice } from "@reduxjs/toolkit";

const loadTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  return localStorage.getItem("shopzone-theme") || "light";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: loadTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectThemeMode = (state) => state.theme.mode;

export default themeSlice.reducer;
