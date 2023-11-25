import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    // _id: { type: String },
    avatar: { type: String },
    email: { type: String, required: true, unique: true },
    name: { type: String, require: true },
    password: { type: String, required: true },
    role: { type: Array, default: ["user"], required: true },
    description: { type: String },
    isCertificate: { type: Boolean, default: false },
    category: { type: Array, default: [] },
    total_course: { type: Number, default: 0 },
    total_review: { type: Number, default: 0 },
    course_Ids: { type: Array, default: [] },
    review_Ids: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

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
