import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  isUnnamed: { type: Boolean, default: false },
  user_id: { type: String, required: true },
  course_id: { type: String, require: true },
  content: { type: String, require: true },
  rating: { type: Number },
  sentiment: { type: Array, default: [] },
  createdAt: { type: String, default: new Date().toISOString() },
});

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
