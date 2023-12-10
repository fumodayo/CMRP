import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  user_id: { type: String, required: true },
  course_id: { type: String, require: true },
  createdAt: { type: String, require: true },
});

const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;
