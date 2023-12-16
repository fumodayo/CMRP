import express from "express";
import expressAsyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import CartModel from "../models/cart.model.js";
import { isAuth } from "../middlewares.js";
import { UserModel } from "../models/user.model.js";
import CourseModel from "../models/course.model.js";

const cartRouter = express.Router();

/** CREATE CART & PUSH USER_ID IN COURSE_ID & PUSH COURSE_ID IN USER_ID */
cartRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { _id } = req.user;
      const { cartItems } = req.body;
      console.log(cartItems);

      await Promise.all(
        cartItems.map(async (item) => {
          const cartData = {
            _id: uuidv4(),
            user_id: _id,
            course_id: item._id,
          };

          const user = await UserModel.findById(_id);
          user.course_Ids.push(item._id);
          user.total_course = user.total_course + 1;
          await user.save();

          const course = await CourseModel.findById(item._id);
          course.student_Ids.push(_id);
          course.total_enroll = course.total_enroll + 1;
          await course.save();

          await CartModel.create(cartData);
        })
      );

      res.status(201).json({ message: "Tạo giỏ hàng thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

export default cartRouter;
