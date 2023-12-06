import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;
