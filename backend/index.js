import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import CategoryRouter from "./router/category.router";
import BlogRouter from "./router/blog.router";
var app = express();
const port = process.env.PORT || 8001;

app.use(express.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log("Your server running on http://localhost:" + port);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/" + process.env.DB_NAME)
  .then(() => console.log("Connected!"));

app.use("/category", CategoryRouter);
app.use("/blog", BlogRouter);
