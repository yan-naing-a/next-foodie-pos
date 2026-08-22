import { MenuState } from "@/types/menu";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenus } = menuSlice.actions;

export default menuSlice.reducer;
