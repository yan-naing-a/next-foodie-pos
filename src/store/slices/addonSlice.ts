import { AddonState } from "@/types/addon";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Addon } from "../../../generated/prisma/browser";

const initialState: AddonState = {
  items: [],
  loading: false,
  error: null,
};

export const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<Addon[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAddons } = addonSlice.actions;

export default addonSlice.reducer;
