import CategoryModel from "../model/category.model";
import path from "path";
import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads/category")) {
      cb(null, "./uploads/category");
    } else {
      fs.mkdirSync("./uploads/category");
      cb(null, "./uploads/category");
    }
  },
  filename: function (req, file, cb) {
    console.log(file);
    const name = file.originalname;
    const ext = path.extname(name);
    const nameArr = name.split(".");
    nameArr.pop();
    const fname = nameArr.join(".");
    const fullname = fname + "-" + Date.now() + ext;
    cb(null, fullname);
  },
});

const upload = multer({ storage: storage });

export const getAllCategory = async (req, res) => {
  try {
    const categoryData = await CategoryModel.find();
    if (categoryData) {
      return res.status(200).json({
        data: categoryData,
        message: "success",
        path: "http://localhost:8001/uploads/category",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getSingleCategory = async (req, res) => {
  try {
    const id = req.params.category_id;
    const categoryData = await CategoryModel.findOne({ _id: id });
    if (categoryData) {
      return res.status(200).json({
        data: categoryData,
        message: "success",
        path: "http://localhost:8001/uploads/category",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addCategory = (req, res) => {
  try {
    const uploadData = upload.single("image");
    uploadData(req, res, function (error) {
      if (error) return res.status(400).json({ message: error.message });

      const { name, description } = req.body;

      let image = null;
      if (req.file !== undefined) {
        image = req.file.filename;
      }
      const createdRecord = new CategoryModel({
        name: name,
        image: image,
        description: description,
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

export const updateCategory = async (req, res) => {
  try {
    const uploadData = upload.single("image");
    uploadData(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });
      const id = req.params.category_id;

      const { name, description } = req.body;
      const categoryData = await CategoryModel.findOne({ _id: id });
      console.log(categoryData);
      let image = categoryData.image;
      if (req.file !== undefined) {
        image = req.file.filename;
        if (fs.existsSync("./uploads/category/" + categoryData.image)) {
          fs.unlinkSync("./uploads/category/" + categoryData.image);
        }
      }
      const updatedCategory = await CategoryModel.updateOne(
        { _id: id },
        {
          $set: {
            name: name,
            description: description,
            image: image,
          },
        }
      );
      if (updatedCategory.acknowledged) {
        return res.status(200).json({
          data: updatedCategory,
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

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.category_id;

    const categoryImage = await CategoryModel.findOne({ _id: id });

    if (fs.existsSync("./uploads/category/" + categoryImage.image)) {
      fs.unlinkSync("./uploads/category/" + categoryImage.image);
    }

    const deletedCategory = await CategoryModel.deleteOne({ _id: id });
    if (deletedCategory.acknowledged) {
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
