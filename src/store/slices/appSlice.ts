import { AppState } from "@/types/app";
import config from "@/utils/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAddonCategories } from "./addonCategorySlice";
import { setAddons } from "./addonSlice";
import { setCompanies } from "./companySlice";
import { setLocations } from "./locationSlice";
import { setMenuAddonCategories } from "./menuAddonCategorySlice";
import { setMenuCategoryMenus } from "./menuCategoryMenuSlice";
import { setMenuCategories } from "./menuCategorySlice";
import { setMenus } from "./menuSlice";
import { setTables } from "./tableSlice";

const initialState: AppState = {
  init: false,
  loading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk("app/fetchAppData", async (_, thunkAPI) => {
  const response = await fetch(`${config.apiBaseUrl}/app`);
  const { msg, data } = await response.json();
  const {
    companies,
    locations,
    tables,
    menuCategories,
    menus,
    menuCategoryMenus,
    addonCategories,
    menuAddonCategories,
    addons,
  } = data;

  thunkAPI.dispatch(setInit(true));
  thunkAPI.dispatch(setCompanies(companies));
  thunkAPI.dispatch(setLocations(locations));
  thunkAPI.dispatch(setTables(tables));
  thunkAPI.dispatch(setMenuCategories(menuCategories));
  thunkAPI.dispatch(setMenus(menus));
  thunkAPI.dispatch(setMenuCategoryMenus(menuCategoryMenus));
  thunkAPI.dispatch(setAddonCategories(addonCategories));
  thunkAPI.dispatch(setMenuAddonCategories(menuAddonCategories));
  thunkAPI.dispatch(setAddons(addons));
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInit } = appSlice.actions;

export default appSlice.reducer;
