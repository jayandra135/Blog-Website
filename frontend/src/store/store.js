import { configureStore } from "@reduxjs/toolkit";

import CategorySlice from "./category/CategorySlice";
import BlogSlice from "./blog/BlogSlice";
const store = configureStore({
  reducer: {
    category: CategorySlice,
    blog: BlogSlice,
  },
});

export default store;
