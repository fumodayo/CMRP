import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  user_id: { type: String, required: true },
  category: { type: Array, default: [] },
  images: { type: Array, default: [] },
  status: { type: String, default: "PENDING" },
  createdAt: { type: String, default: new Date().toISOString() },
});

const CertificateModel = mongoose.model("Certificate", certificateSchema);
export default CertificateModel;
