import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBlogByCategory = createAsyncThunk(
  "getBlogByCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8001/blog/get-blogby-category/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSingleBlog = createAsyncThunk(
  "getSingleBlog",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8001/blog/get-single-blog/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
