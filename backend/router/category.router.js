import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from "../controller/category.controller";

const router = express.Router();

router.get("/get-all-category", getAllCategory);
router.get("/get-single-category/:category_id", getSingleCategory);
router.post("/add-category", addCategory);
router.put("/update-category/:category_id", updateCategory);
router.delete("/delete-category/:category_id", deleteCategory);

export default router;
