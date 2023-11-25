import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    // _id: { type: String },
    name: { type: String },
    author: { type: String },
    author_image: { type: String },
    image: { type: String },
    thumbnail: { type: String },
    price: { type: Number },
    createdAt: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    category: { type: Array, default: [] },
    type: { type: String },
    address: {
      type: {
        Object,
      },
      default: {},
    },
    short_description: { type: String },
    description: { type: String },
    requirement: { type: String },
    schedule: { type: Array, default: [] },
    total_rating: { type: Number, default: 0 },
    total_review: { type: Number, default: 0 },
    total_student: { type: Number, default: 0 },
    total_lesson: { type: Number, default: 0 },
    total_enroll: { type: Number, default: 0 },
    status: { type: String, default: "AWAITING" },
    student_Ids: { type: Array, default: [] },
    reviews_Ids: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
