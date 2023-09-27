import mongoose from "mongoose";
import categoryModel from "./category.model";
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: categoryModel,
  },
  description: {
    type: String,
    required: true,
  },

  authorName: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Blog", BlogSchema);
