import { CreateMenuOption, DeleteMenuOption, MenuState, UpdateMenuOption } from "@/types/menu";
import config from "@/utils/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Menu } from "../../../generated/prisma/client";
import {
  addMenuAddonCategories,
  editMenuAddonCategoriesByMenu,
  removeMenuAddonCategoriesByMenu,
} from "./menuAddonCategorySlice";
import {
  addMenuCategoryMenus,
  editMenuCategoryMenusByMenu,
  removeMenuCategoryMenusByMenu,
} from "./menuCategoryMenuSlice";

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
      thunkAPI.dispatch(editMenuCategoryMenusByMenu({ id: menu.id, items: menuCategoryMenus }));
      thunkAPI.dispatch(editMenuAddonCategoriesByMenu({ id: menu.id, items: menuAddonCategories }));
      onSuccess && onSuccess();
    } catch (err) {
      console.log("reach to error code");
      onError && onError(err);
    }
  },
);
export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (payload: DeleteMenuOption, thunkAPI) => {
    const { id, onSuccess, onError } = payload;

    try {
      const response = await fetch(`${config.apiBaseUrl}/menu?id=${id}`, { method: "DELETE" });
      const { msg } = await response.json();

      thunkAPI.dispatch(removeMenu(id));
      thunkAPI.dispatch(removeMenuCategoryMenusByMenu({ id }));
      thunkAPI.dispatch(removeMenuAddonCategoriesByMenu({ id }));
      onSuccess && onSuccess();
    } catch (err) {
      console.log("reach to error code");
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
    removeMenu: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenus, addMenu, editMenu, removeMenu } = menuSlice.actions;

export default menuSlice.reducer;
