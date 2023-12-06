import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  user_id: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  category: { type: Array, default: [], required: true },
  type: { type: String, required: true },
  thumbnail: { type: String },
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
  createdAt: { type: String, required: true },
});

const CourseModel = mongoose.model("Course", courseSchema);
export default CourseModel;
