import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "./Action";

const initialState = {
  category: [],
  catgeory: {},
  isLoading: false,
  success: null,
  error: null,
};

export const categorySlice = createSlice({
  name: "getCategory",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    },
    [getCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default categorySlice.reducer;
