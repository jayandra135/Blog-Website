import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlog,
  getBlogByCategory,
  getSingleBlog,
  updateBlog,
} from "../controller/blog.controller";
const router = express.Router();

router.get("/get-all-blog", getAllBlog);
router.get("/get-single-blog/:blog_id", getSingleBlog);
router.post("/add-blog", addBlog);
router.put("/update-blog/:blog_id", updateBlog);
router.delete("/delete-blog/:blog_id", deleteBlog);

router.get("/get-blogby-category/:category_id", getBlogByCategory);

export default router;
