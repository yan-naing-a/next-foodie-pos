import { CreateLocationOption, LocationState, UpdateLocationOption } from "@/types/location";
import config from "@/utils/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../../generated/prisma/client";

const initialState: LocationState = {
  items: [],
  loading: false,
  error: null,
};

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (payload: CreateLocationOption, thunkAPI) => {
    const { name, address, onSuccess, onError } = payload;

    try {
      const response = await fetch(`${config.apiBaseUrl}/location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, address }),
      });
      const { msg, data: newLocation } = await response.json();
      thunkAPI.dispatch(addLocation(newLocation));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError(error);
    }
  },
);
export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async (payload: UpdateLocationOption, thunkAPI) => {
    const { id, name, address, onSuccess, onError } = payload;

    try {
      const response = await fetch(`${config.apiBaseUrl}/location?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address }),
      });
      const { msg, data: updatedLocation } = await response.json();
      thunkAPI.dispatch(editLocation(updatedLocation));
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError(error);
    }
  },
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.items = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.items = [...state.items, action.payload];
    },
    editLocation: (state, action: PayloadAction<Location>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocations, addLocation, editLocation } = locationSlice.actions;

export default locationSlice.reducer;
