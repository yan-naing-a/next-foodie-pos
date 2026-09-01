import { AddonCategoryState } from "@/types/addonCategory";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddonCategory } from "../../../generated/prisma/client";

const initialState: AddonCategoryState = {
  items: [],
  loading: false,
  error: null,
};

export const addonCategorySlice = createSlice({
  name: "addonCategory",
  initialState,
  reducers: {
    setAddonCategories: (state, action: PayloadAction<AddonCategory[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAddonCategories } = addonCategorySlice.actions;

export default addonCategorySlice.reducer;
