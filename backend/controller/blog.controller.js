import BlogModel from "../model/blog.model";
import path from "path";
import fs from "fs";
import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads/blog")) {
      cb(null, "./uploads/blog");
    } else {
      fs.mkdirSync("./uploads/blog");
      cb(null, "./uploads/blog");
    }
  },
  filename: function (req, file, cb) {
    const name = file.originalname;

    const ext = path.extname(name);
    const nameArr = name.split(".");
    nameArr.pop();
    const fname = nameArr.join(".");
    const fullname = fname + "-" + Date.now() + ext;
    cb(null, fullname);
  },
});
console.log(storage);

const upload = multer({ storage: storage });

export const getAllBlog = async (req, res) => {
  try {
    const blogData = await BlogModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categories",
        },
      },
      { $unwind: "$categories" },
    ]);

    if (blogData) {
      return res.status(200).json({
        data: blogData,
        message: "success",
        path: "http://localhost:8001/uploads/blog",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getBlogByCategory = async (req, res) => {
  try {
    const id = req.params.category_id;

    const BlogData = await BlogModel.find({ category: id }).populate(
      "category"
    );
    if (BlogData) {
      return res.status(200).json({
        data: BlogData,
        message: "success",
        path: "http://localhost:8001/uploads/blog",
        categoryPath: "http://localhost:8001/uploads/category",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addBlog = (req, res) => {
  try {
    const uploadData = upload.single("image");

    uploadData(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });
      const { title, category, description, authorName } = req.body;

      let image = null;

      if (req.file !== undefined) {
        image = req.file.filename;
      }

      const createdRecord = new BlogModel({
        title: title,
        category: category,
        image: image,
        description: description,
        authorName: authorName,
      });

      createdRecord.save();
      if (createdRecord) {
        return res.status(201).json({
          data: createdRecord,
          message: "Success",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const id = req.params.blog_id;
    const blogData = await BlogModel.findOne({ _id: id });

    if (blogData) {
      return res.status(200).json({
        data: blogData,
        message: "Success",
        path: "http://localhost:8001/uploads/blog",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const uploadData = upload.single("image");
    uploadData(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const blog_id = req.params.blog_id;
      const { title, category, description, authorName } = req.body;
      const blogData = await BlogModel.findOne({
        _id: blog_id,
      });
      let image = blogData.image;
      if (req.file !== undefined) {
        image = req.file.filename;
        if (fs.existsSync("./uploads/blog/" + blogData.image)) {
          fs.unlinkSync("./uploads/blog/" + blogData.image);
        }
      }
      const updatedBlog = await BlogModel.updateOne(
        { _id: blog_id },
        {
          $set: {
            title: title,
            image: image,
            category: category,
            description: description,
            authorName: authorName,
          },
        }
      );
      if (updatedBlog.acknowledged) {
        return res.status(200).json({
          data: updatedBlog,
          message: "updated",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.blog_id;
    const blogImage = await BlogModel.findOne({ _id: id });

    if (fs.existsSync("./uploads/blog/" + blogImage.image)) {
      fs.unlinkSync("./uploads/blog/" + blogImage.image);
    }
    const deletedBlog = await BlogModel.deleteOne({ _id: id });
    if (deletedBlog.acknowledged) {
      return res.status(200).json({
        message: "Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
