import express from "express";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import CourseModel from "../models/course.model.js";
import { UserModel } from "../models/user.model.js";

const instructorRouter = express.Router();

instructorRouter.get(
  "/courses",
  expressAsyncHandler(async (req, res) => {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decoded;
    const course = await CourseModel.find({ user_id: _id });
    if (course) {
      res.send(course);
    } else {
      res.status(404).send({ message: "Course not found" });
    }
  })
);

export default instructorRouter;
