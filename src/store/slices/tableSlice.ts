import { CreateTableOption, TableState, UpdateTableOption } from "@/types/table";
import config from "@/utils/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Table } from "../../../generated/prisma/client";

const initialState: TableState = {
  items: [],
  loading: false,
  error: null,
};

export const createTable = createAsyncThunk(
  "table/createTable",
  async (payload: CreateTableOption, thunkAPI) => {
    const { name, locationId, onSuccess, onError } = payload;
    try {
      const response = await fetch(`${config.apiBaseUrl}/table`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, locationId }),
      });
      const { msg, data: table } = await response.json();
      thunkAPI.dispatch(addTable(table));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  },
);
export const updateTable = createAsyncThunk(
  "table/updateTable",
  async (payload: UpdateTableOption, thunkAPI) => {
    const { id, name, locationId, onSuccess, onError } = payload;
    try {
      const response = await fetch(`${config.apiBaseUrl}/table?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, locationId }),
      });
      const { msg, data: table } = await response.json();
      thunkAPI.dispatch(editTable(table));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  },
);

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.items = action.payload;
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.items = [...state.items, action.payload];
    },
    editTable: (state, action: PayloadAction<Table>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTables, addTable, editTable } = tableSlice.actions;

export default tableSlice.reducer;
