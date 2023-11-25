import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    isUnnamed: { type: Boolean, required: true },
    author: { type: String, require: true },
    avatar: { type: String, require: true },
    course_id: { type: String, require: true },
    createdAt: { type: String, require: true },
    content: { type: String, require: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
