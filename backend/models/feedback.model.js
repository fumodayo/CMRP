import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  user_id: { type: String, required: true },
  course_id: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, default: "PENDING" },
  createdAt: { type: String, default: new Date().toISOString() },
});

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema);
export default FeedbackModel;
