import {
  EditMenuCategoryMenu,
  EditMenuCategoryMenuPayload,
  MenuCategoryMenuState,
  RemoveMenuCategoryMenu,
} from "@/types/menuCategoryMenu";
import config from "@/utils/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuCategoryMenu } from "../../../generated/prisma/client";

const initialState: MenuCategoryMenuState = {
  items: [],
  loading: false,
  error: null,
};
export const updateMenuCategoryMenu = createAsyncThunk(
  "menuCategory/updateMenuCategoryMenu",
  async (payload: EditMenuCategoryMenuPayload, thunkAPI) => {
    const { items, onSuccess, onError } = payload;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu-category-menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const { msg, data } = await response.json();
      thunkAPI.dispatch(addMenuCategoryMenus(data));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  },
);

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
    editMenuCategoryMenusByMenuCategory: (state, action: PayloadAction<EditMenuCategoryMenu>) => {
      const remainingMenuCategoryMenus = state.items.filter(
        (item) => item.menuCategoryId !== action.payload.id,
      );
      state.items = [...remainingMenuCategoryMenus, ...action.payload.items];
    },

    editMenuCategoryMenusByMenu: (state, action: PayloadAction<EditMenuCategoryMenu>) => {
      const remainingMenuCategoryMenus = state.items.filter(
        (item) => item.menuId !== action.payload.id,
      );
      state.items = [...remainingMenuCategoryMenus, ...action.payload.items];
    },
    removeMenuCategoryMenusByMenuCategory: (
      state,
      action: PayloadAction<RemoveMenuCategoryMenu>,
    ) => {
      state.items = state.items.filter((item) => item.menuCategoryId !== action.payload.id);
    },
    removeMenuCategoryMenusByMenu: (state, action: PayloadAction<RemoveMenuCategoryMenu>) => {
      state.items = state.items.filter((item) => item.menuId !== action.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMenuCategoryMenus,
  addMenuCategoryMenus,
  editMenuCategoryMenusByMenuCategory,
  editMenuCategoryMenusByMenu,
  removeMenuCategoryMenusByMenu,
  removeMenuCategoryMenusByMenuCategory,
} = menuCategoryMenuSlice.actions;

export default menuCategoryMenuSlice.reducer;
