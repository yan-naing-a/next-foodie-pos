import { CreateMenuOption, MenuState, UpdateMenuOption } from "@/types/menu";
import config from "@/utils/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Menu } from "../../../generated/prisma/client";
import { addMenuAddonCategories, editMenuAddonCategories } from "./menuAddonCategorySlice";
import { addMenuCategoryMenus, editMenuCategoryMenusByMenu } from "./menuCategoryMenuSlice";

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (payload: CreateMenuOption, thunkAPI) => {
    const {
      name,
      price,
      description,
      assetUrl,
      menuCategoryIds,
      addonCategoryIds,
      onSuccess,
      onError,
    } = payload;

    try {
      const response = await fetch(`${config.apiBaseUrl}/menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          description,
          assetUrl,
          menuCategoryIds,
          addonCategoryIds,
        }),
      });
      const { msg, data } = await response.json();
      const { menu, menuCategoryMenus, menuAddonCategories } = data;
      thunkAPI.dispatch(addMenu(menu));
      thunkAPI.dispatch(addMenuCategoryMenus(menuCategoryMenus));
      menuAddonCategories.length && thunkAPI.dispatch(addMenuAddonCategories(menuAddonCategories));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  },
);

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (payload: UpdateMenuOption, thunkAPI) => {
    const {
      id,
      name,
      price,
      description,
      assetUrl,
      menuCategoryIds,
      addonCategoryIds,
      onSuccess,
      onError,
    } = payload;

    try {
      const response = await fetch(`${config.apiBaseUrl}/menu?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          description,
          assetUrl,
          menuCategoryIds,
          addonCategoryIds,
        }),
      });
      const { msg, data } = await response.json();
      const { menu, menuCategoryMenus, menuAddonCategories } = data;

      thunkAPI.dispatch(editMenu(menu));
      thunkAPI.dispatch(editMenuCategoryMenusByMenu(menuCategoryMenus));
      menuAddonCategories.length && thunkAPI.dispatch(editMenuAddonCategories(menuAddonCategories));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  },
);

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<Menu[]>) => {
      state.items = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.items = [...state.items, action.payload];
    },
    editMenu: (state, action: PayloadAction<Menu>) => {
      state.items = state.items.map((menu) =>
        menu.id === action.payload.id ? action.payload : menu,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenus, addMenu, editMenu } = menuSlice.actions;

export default menuSlice.reducer;
