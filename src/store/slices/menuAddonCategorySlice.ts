import { MenuAddonCategoryState } from "@/types/menuAddonCategory";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuAddonCategory } from "../../../generated/prisma/client";

const initialState: MenuAddonCategoryState = {
  items: [],
  loading: false,
  error: null,
};

export const menuAddonCategorySlice = createSlice({
  name: "menuAddonCategory",
  initialState,
  reducers: {
    setMenuAddonCategories: (state, action: PayloadAction<MenuAddonCategory[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenuAddonCategories } = menuAddonCategorySlice.actions;

export default menuAddonCategorySlice.reducer;
