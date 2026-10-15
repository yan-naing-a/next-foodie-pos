import { EditMenuAddonCategory, MenuAddonCategoryState } from "@/types/menuAddonCategory";
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
    addMenuAddonCategories: (state, action: PayloadAction<MenuAddonCategory[]>) => {
      state.items = [...state.items, ...action.payload];
    },
    editMenuAddonCategoriesByMenu: (state, action: PayloadAction<EditMenuAddonCategory>) => {
      const remainingMenuAddonCategories = state.items.filter(
        (item) => item.menuId !== action.payload.id,
      );
      state.items = [...remainingMenuAddonCategories, ...action.payload.items];
    },
    editMenuAddonCategoriesByAddonCategory: (
      state,
      action: PayloadAction<EditMenuAddonCategory>,
    ) => {
      const remainingMenuAddonCategories = state.items.filter(
        (item) => item.addonCategoryId !== action.payload.id,
      );
      state.items = [...remainingMenuAddonCategories, ...action.payload.items];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMenuAddonCategories,
  addMenuAddonCategories,
  editMenuAddonCategoriesByMenu,
  editMenuAddonCategoriesByAddonCategory,
} = menuAddonCategorySlice.actions;

export default menuAddonCategorySlice.reducer;
