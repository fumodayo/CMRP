import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String },
    author: { type: String },
    rating: { type: Number },
    image: { type: String },
    thumbnail: { type: String },
    author_image: { type: String },
    status: { type: String },
    price: { type: Number },
    startDate: { type: String },
    endDate: { type: String },
    category: { type: String },
    location: { type: String },
    address: { type: Array },
    description: { type: String },
    requirement: { type: String },
    syllabus: { type: String },
    total_student: { type: Number },
    createdAt: { type: String },
    total_review: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
