import { CreateMenuCategoryOption, MenuCategoryState } from "@/types/menuCategory";
import config from "@/utils/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuCategory } from "../../../generated/prisma/client";
import { addMenuCategoryMenus } from "./menuCategoryMenuSlice";

const initialState: MenuCategoryState = {
  items: [],
  loading: false,
  error: null,
};

export const createMenuCategory = createAsyncThunk(
  "menuCategory/createMenuCategory",
  async (payload: CreateMenuCategoryOption, thunkAPI) => {
    const { name, menuIds, onSuccess, onError } = payload;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, menuIds }),
      });
      const { msg, data } = await response.json();
      const { menuCategory, menuCategoryMenus } = data;
      thunkAPI.dispatch(addMenuCategory(menuCategory));
      thunkAPI.dispatch(addMenuCategoryMenus(menuCategoryMenus));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  },
);

export const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategories: (state, action: PayloadAction<MenuCategory[]>) => {
      state.items = action.payload;
    },
    addMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenuCategories, addMenuCategory } = menuCategorySlice.actions;

export default menuCategorySlice.reducer;
