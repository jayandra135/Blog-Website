import { createSlice } from "@reduxjs/toolkit";
import { getBlogByCategory, getSingleBlog } from "./Action";

const initialState = {
  blogs: [],
  blog: {},
  isLoading: false,
  success: null,
  error: null,
};

export const blogSlice = createSlice({
  name: "getBlogByCategory",
  initialState,
  reducers: {},
  extraReducers: {
    [getBlogByCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getBlogByCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    },
    [getBlogByCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getSingleBlog.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleBlog.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.blog = action.payload;
    },
    [getSingleBlog.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default blogSlice.reducer;
