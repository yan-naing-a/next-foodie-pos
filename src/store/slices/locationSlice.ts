import { LocationState } from "@/types/location";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../../generated/prisma/client";

const initialState: LocationState = {
  items: [],
  loading: false,
  error: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocations } = locationSlice.actions;

export default locationSlice.reducer;
