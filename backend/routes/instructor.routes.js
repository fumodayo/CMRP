import express from "express";
import expressAsyncHandler from "express-async-handler";
import CourseModel from "../models/course.model.js";
import { isAuth } from "../middlewares.js";

const instructorRouter = express.Router();

instructorRouter.get(
  "/courses",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const course = await CourseModel.find({ user_id: _id });
    if (course) {
      res.send(course);
    } else {
      res.status(404).send({ message: "Bạn chưa tạo khóa học nào cả" });
    }
  })
);

export default instructorRouter;
