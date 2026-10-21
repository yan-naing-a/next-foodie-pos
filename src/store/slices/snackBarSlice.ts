import { SnackBarState } from "@/types/snackBar";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SnackBarState = {
  open: false,
  message: "",
  autoHideDuration: 5000,
  severity: "success",
};

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    setOpenSnackBar: (state, action: PayloadAction<SnackBarState>) => {
      const { message, autoHideDuration, severity } = action.payload;
      state.open = true;
      state.message = message;
      state.autoHideDuration = autoHideDuration ? autoHideDuration : state.autoHideDuration;
      state.severity = severity ? severity : state.severity;
    },
    resetSnackBar: (state) => {
      state.open = false;
      state.message;
      state.autoHideDuration;
      state.severity;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenSnackBar, resetSnackBar } = snackBarSlice.actions;

export default snackBarSlice.reducer;
