import { MenuCategoryState } from "@/types/menuCategory";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuCategory } from "../../../generated/prisma/client";

const initialState: MenuCategoryState = {
  items: [],
  loading: false,
  error: null,
};

export const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategories: (state, action: PayloadAction<MenuCategory[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenuCategories } = menuCategorySlice.actions;

export default menuCategorySlice.reducer;
