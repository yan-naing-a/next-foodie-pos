import { MenuCategoryMenuState } from "@/types/menuCategoryMenu";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuCategoryMenu } from "../../../generated/prisma/client";

const initialState: MenuCategoryMenuState = {
  items: [],
  loading: false,
  error: null,
};

export const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {
    setMenuCategoryMenus: (state, action: PayloadAction<MenuCategoryMenu[]>) => {
      state.items = action.payload;
    },
    addMenuCategoryMenus: (state, action: PayloadAction<MenuCategoryMenu[]>) => {
      state.items = [...state.items, ...action.payload];
    },
    editMenuCategoryMenus: (state, action: PayloadAction<MenuCategoryMenu[]>) => {
      const remainingMenuCategoryMenus = state.items.filter(
        (item) => !action.payload.find((pItem) => item.menuCategoryId === pItem.menuCategoryId),
      );
      state.items = [...remainingMenuCategoryMenus, ...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenuCategoryMenus, addMenuCategoryMenus, editMenuCategoryMenus } =
  menuCategoryMenuSlice.actions;

export default menuCategoryMenuSlice.reducer;
