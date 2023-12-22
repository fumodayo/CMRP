import express from "express";
import expressAsyncHandler from "express-async-handler";
import CourseModel from "../models/course.model.js";
import { isAuth } from "../middlewares.js";
import { UserModel } from "../models/user.model.js";

const instructorRouter = express.Router();

/** GET COURSES */
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

/** PROFILE */
instructorRouter.get(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).send({ message: "Không tìm thấy user" });
    }

    return res.send(user);
  })
);

/** EDIT COURSE */
// instructorRouter.get(
//   "/course/:id",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const { _id } = req.user;
//     const course = await CourseModel.find({ user_id: _id });
//     if (course) {
//       res.send(course);
//     } else {
//       res.status(404).send({ message: "Bạn chưa tạo khóa học nào cả" });
//     }
//   })
// );

/** UPDATE PROFILE */
instructorRouter.put(
  "/update-profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { name, avatar, bio } = req.body;

    try {
      const updates = {};

      if (avatar) {
        updates.avatar = avatar;
      }

      if (name) {
        updates.name = name;
      }

      if (bio) {
        updates.bio = bio;
      }

      await UserModel.findOneAndUpdate({ _id: _id }, updates, { new: true });

      res.status(200).json({ message: "Thay đổi thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

export default instructorRouter;
