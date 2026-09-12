import { AddonState, CreateAddonOption } from "@/types/addon";
import config from "@/utils/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Addon } from "../../../generated/prisma/browser";

const initialState: AddonState = {
  items: [],
  loading: false,
  error: null,
};

export const createAddon = createAsyncThunk(
  "addon/createAddon",
  async (payload: CreateAddonOption, thunkAPI) => {
    const { name, price, addonCategoryId, onSuccess, onError } = payload;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, addonCategoryId }),
      });
      const { msg, data: addon } = await response.json();
      thunkAPI.dispatch(addAddon(addon));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  },
);

export const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<Addon[]>) => {
      state.items = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addon>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAddons, addAddon } = addonSlice.actions;

export default addonSlice.reducer;
