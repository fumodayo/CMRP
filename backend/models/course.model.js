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
  thumbnail: { type: String, default: "" },
  address: {
    type: {
      Object,
    },
    default: {},
  },
  short_description: { type: String, default: "" },
  description: { type: String, default: "" },
  requirement: { type: String, default: "" },
  schedule: { type: Array, default: [] },
  student_Ids: { type: Array, default: [] },
  total_enroll: { type: Number, default: 0 },
  total_student: { type: Number, default: 0 },
  status: { type: String, default: "PENDING" },
  createdAt: { type: String, default: new Date().toISOString() },
});

const CourseModel = mongoose.model("Course", courseSchema);
export default CourseModel;
