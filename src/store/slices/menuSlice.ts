import { MenuState } from "@/types/menu";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Menu } from "../../../generated/prisma/client";

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<Menu[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenus } = menuSlice.actions;

export default menuSlice.reducer;
