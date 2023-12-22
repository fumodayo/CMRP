import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  _id: { type: String },
  avatar: { type: String },
  name: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Array, default: ["user"] },
  bio: { type: String, default: "" },
  isCertificate: { type: Boolean, default: false },
  category: { type: Array, default: [] },
  real_name: { type: String, default: "" },
  cccd_number: { type: String, default: "" },
  dateOfBirth: { type: String, default: "" },
  status: { type: String, default: "ACTIVE" },
  createdAt: { type: String, default: new Date().toISOString() },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model("User", userSchema);
