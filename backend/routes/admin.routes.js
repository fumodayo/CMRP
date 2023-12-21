import express from "express";
import { UserModel } from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../middlewares.js";
import CourseModel from "../models/course.model.js";

const adminRouter = express.Router();

/** GET USERS */
adminRouter.get(
  "/user",
  expressAsyncHandler(async (req, res) => {
    const users = await UserModel.find({});
    if (users) {
      return res.status(200).send(users);
    }

    return res.status(501).send({ message: "Authentication" });
  })
);

/** GET USER BY ID */
adminRouter.get(
  "/user/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const user_id = req.params.id;
      const user = await UserModel.findById(user_id);

      if (!user) {
        return res.status(404).send({ message: "Không có user" });
      }

      const courses = await CourseModel.find({ user_id: user_id });
      return res.send({
        user,
        courses: courses,
      });
    } catch (err) {
      res.status(500).send({ message: "Lỗi server" });
    }
  })
);

export default adminRouter;
