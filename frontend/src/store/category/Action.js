import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk(
  "getCategory",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8001/category/get-all-category/`
      );
      console.log(data, "data");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
