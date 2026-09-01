import { TableState } from "@/types/table";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Table } from "../../../generated/prisma/client";

const initialState: TableState = {
  items: [],
  loading: false,
  error: null,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTables } = tableSlice.actions;

export default tableSlice.reducer;
