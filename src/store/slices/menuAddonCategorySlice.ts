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
    addMenuAddonCategories: (state, action: PayloadAction<MenuAddonCategory[]>) => {
      state.items = [...state.items, ...action.payload];
    },
    editMenuAddonCategoriesByMenu: (state, action: PayloadAction<MenuAddonCategory[]>) => {
      const remainingMenuAddonCategories = state.items.filter(
        (item) => !action.payload.find((pItem) => item.menuId === pItem.menuId),
      );
      state.items = [...remainingMenuAddonCategories, ...action.payload];
    },
    editMenuAddonCategoriesByAddonCategory: (state, action: PayloadAction<MenuAddonCategory[]>) => {
      const remainingMenuAddonCategories = state.items.filter(
        (item) => !action.payload.find((pItem) => item.addonCategoryId === pItem.addonCategoryId),
      );
      state.items = [...remainingMenuAddonCategories, ...action.payload];
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
