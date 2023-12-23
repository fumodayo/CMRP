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
instructorRouter.put(
  "/edit-course/:id",
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

/** NONPUBLIC */
instructorRouter.put(
  "/course/:id",
  expressAsyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const { status } = req.body;
    console.log(status);

    try {
      const course = await CourseModel.findById(courseId);

      if (!course) {
        return res.status(404).json({ message: "Khóa học không tồn tại" });
      }

      course.status = status;

      await course.save();
      res.status(200).json({ message: "Thay đổi thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

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

/** POST COURSE */
instructorRouter.post(
  "/post-course",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const {
      address,
      category,
      endDate,
      image,
      name,
      price,
      schedule,
      startDate,
      total_student,
      type,
      short_description,
      description,
      requirement,
    } = req.body;

    const { _id } = req.user;

    try {
      await CourseModel.create({
        _id: uuidv4(),
        user_id: _id,
        address,
        category,
        endDate,
        image,
        name,
        price,
        schedule,
        startDate,
        total_student,
        type,
        short_description,
        description,
        requirement,
      });

      res.status(201).json("Tạo khóa học thành công");
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

/** POST CERTIFICATE */
instructorRouter.post(
  "/post-certificate",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { certificates } = req.body;
    const { _id } = req.user;

    try {
      for (const certificate of certificates) {
        const { category, images } = certificate;

        await CertificateModel.create({
          _id: uuidv4(),
          user_id: _id,
          category: category,
          images: images,
        });
      }

      res.status(201).json({ message: "Tạo thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

export default instructorRouter;
