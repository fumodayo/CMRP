import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  isUnnamed: { type: Boolean, default: false },
  user_id: { type: String, required: true },
  course_id: { type: String, require: true },
  content: { type: String, require: true },
  rating: { type: Number, required: true },
  createdAt: { type: String, require: true },
});

const CertificateModal = mongoose.model("Certificate", certificateSchema);
export default CertificateModal;
