import express from "express";
import { UserModel } from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import ReviewModel from "../models/review.model.js";
import CourseModel from "../models/course.model.js";

const userRouter = express.Router();

/** GET PROFILE */
userRouter.get(
  "/profile",
  expressAsyncHandler(async (req, res) => {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decoded;

    try {
      let user = await UserModel.findById(_id);

      if (user) {
        const reviews = await ReviewModel.find({
          _id: { $in: user.review_Ids },
        });

        // Lặp qua từng đánh giá và thêm thông tin từ model Course dựa trên course_id
        for (let i = 0; i < reviews.length; i++) {
          const course_id = reviews[i].course_id;

          // Tìm thông tin từ model Course dựa trên course_id
          const course = await CourseModel.findById(course_id);

          // Nếu tìm thấy thông tin của course, thêm thông tin name vào đánh giá
          if (course) {
            reviews[i].course_name = course.name;
          }
        }

        // Thay thế trường reviews trong đối tượng người dùng với thông tin đã được cập nhật
        user.reviews = reviews;
        console.log(reviews);
        return res.send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).send({ message: "Server error" });
    }
  })
);

export default userRouter;
