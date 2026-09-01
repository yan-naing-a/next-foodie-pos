import { CompanyState } from "@/types/company";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "../../../generated/prisma/client";

const initialState: CompanyState = {
  items: [],
  loading: false,
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCompanies } = companySlice.actions;

export default companySlice.reducer;
