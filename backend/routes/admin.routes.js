import express from "express";
import { UserModel } from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../middlewares.js";
import CourseModel from "../models/course.model.js";
import FeedbackModel from "../models/feedback.model.js";
import CertificateModel from "../models/certificate.model.js";

const adminRouter = express.Router();

/** GET USERS */
adminRouter.get(
  "/user",
  isAdmin,
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

/** GET ALL CERTIFATE */
adminRouter.get(
  "/certificate",
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const certificates = await CertificateModel.find({});
      const data = [];

      for (const certificate of certificates) {
        const user = await UserModel.findById(certificate.user_id);
        if (user) {
          data.push({
            ...certificate.toObject(),
            name: user.name,
          });
        }
      }

      if (data.length > 0) {
        return res.status(200).json(data);
      } else {
        return res
          .status(404)
          .json({ message: "Không tìm thấy giấy xác thực" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  })
);

/** CHANGE STATUS USER: ACTIVE <-> INACTIVE*/
adminRouter.put(
  "/user-status/:id",
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { status } = req.body;

    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "USER không tồn tại" });
      }

      user.status = status;

      await user.save();
      res.status(200).json({ message: "Thay đổi thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

/** CHANGE STATUS FEEDBACK: PENDING -> COMPLETED */
adminRouter.put(
  "/feedback/:id",
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const feedbackId = req.params.id;
    const { status } = req.body;

    try {
      const feedback = await FeedbackModel.findById(feedbackId);

      if (!feedback) {
        return res.status(404).json({ message: "Feedback không tồn tại" });
      }

      feedback.status = status;

      await feedback.save();
      res.status(200).json({ message: "Thay đổi thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

/** CHANGE STATUS COURSE: PENDING -> PUBLIC/REJECTED & PUBLIC <-> REJECTED */
adminRouter.put(
  "/course/:id",
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const { status } = req.body;

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

/** CHANGE STATUS CERTIFICATE: PENDING -> COMPLETED/REJECTED */
adminRouter.put(
  "/certificate/:id",
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const certificateId = req.params.id;
    const { status } = req.body;

    try {
      const certificate = await CertificateModel.findById(certificateId);

      if (!certificate) {
        return res.status(404).json({ message: "Chứng chỉ không tồn tại" });
      }

      certificate.status = status;

      await certificate.save();
      res.status(200).json({ message: "Thay đổi thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

export default adminRouter;
