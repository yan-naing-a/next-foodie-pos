import {
  AddonCategoryState,
  CreateAddonCategoryOption,
  UpdateAddonCategoryOption,
} from "@/types/addonCategory";
import config from "@/utils/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddonCategory } from "../../../generated/prisma/client";
import {
  addMenuAddonCategories,
  editMenuAddonCategoriesByAddonCategory,
} from "./menuAddonCategorySlice";

const initialState: AddonCategoryState = {
  items: [],
  loading: false,
  error: null,
};

export const createAddonCategory = createAsyncThunk(
  "addonCategory/createAddonCategory",
  async (payload: CreateAddonCategoryOption, thunkAPI) => {
    const { name, menuIds, isRequired, onSuccess, onError } = payload;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addon-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, menuIds, isRequired }),
      });
      const { msg, data } = await response.json();
      const { addonCategory, menuAddonCategories } = data;
      thunkAPI.dispatch(addAddonCategories(addonCategory));
      thunkAPI.dispatch(addMenuAddonCategories(menuAddonCategories));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  },
);
export const updateAddonCategory = createAsyncThunk(
  "addonCategory/updateAddonCategory",
  async (payload: UpdateAddonCategoryOption, thunkAPI) => {
    const { id, name, menuIds, isRequired, onSuccess, onError } = payload;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addon-category?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, menuIds, isRequired }),
      });
      const { msg, data } = await response.json();
      const { addonCategory, menuAddonCategories } = data;
      thunkAPI.dispatch(editAddonCategories(addonCategory));
      thunkAPI.dispatch(
        editMenuAddonCategoriesByAddonCategory({
          id: addonCategory.id,
          items: menuAddonCategories,
        }),
      );
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  },
);

export const addonCategorySlice = createSlice({
  name: "addonCategory",
  initialState,
  reducers: {
    setAddonCategories: (state, action: PayloadAction<AddonCategory[]>) => {
      state.items = action.payload;
    },
    addAddonCategories: (state, action: PayloadAction<AddonCategory>) => {
      state.items = [...state.items, action.payload];
    },
    editAddonCategories: (state, action: PayloadAction<AddonCategory>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAddonCategories, addAddonCategories, editAddonCategories } =
  addonCategorySlice.actions;

export default addonCategorySlice.reducer;
