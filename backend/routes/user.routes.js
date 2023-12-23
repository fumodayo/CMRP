import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../middlewares.js";
import { UserModel } from "../models/user.model.js";
import ReviewModel from "../models/review.model.js";
import CourseModel from "../models/course.model.js";
import CartModel from "../models/cart.model.js";
import FeedbackModel from "../models/feedback.model.js";
import { v4 as uuidv4 } from "uuid";
import CertificateModel from "../models/certificate.model.js";

const userRouter = express.Router();

/** GET PROFILE */
userRouter.get(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { _id } = req.user;
      const user = await UserModel.findById(_id);

      if (!user) {
        return res.status(404).send({ message: "Không tìm thấy user" });
      }

      const reviews = await ReviewModel.find({ user_id: _id });
      const reviewsWithCourseNames = await Promise.all(
        reviews.map(async (review) => {
          const course = await CourseModel.findById(review.course_id);
          return course ? { ...review._doc, course_name: course.name } : review;
        })
      );

      const userCart = await CartModel.find({ user_id: _id });
      const cartsWithCourseDetails = await Promise.all(
        userCart.map(async (cartItem) => {
          const course = await CourseModel.findById(cartItem.course_id);
          const author = await UserModel.findById(course.user_id);
          return course
            ? { ...cartItem._doc, course_details: course, author: author.name }
            : cartItem;
        })
      );

      const userFeedback = await FeedbackModel.find({ user_id: _id });

      return res.send({
        user,
        reviews: reviewsWithCourseNames,
        carts: cartsWithCourseDetails,
        feedbacks: userFeedback,
      });
    } catch (err) {
      res.status(500).send({ message: "Lỗi server" });
    }
  })
);

/** POST FEEDBACK */
userRouter.post(
  "/feedback",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { course_id, content } = req.body;

    try {
      await FeedbackModel.create({
        _id: uuidv4(),
        user_id: _id,
        course_id,
        content,
      });
      res.status(201).json({ message: "Tạo thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

/** POST COURSE */
userRouter.post(
  "/course",
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

      const user = await UserModel.findById(_id);
      user.role.push("instructor");
      await user.save();

      res.status(201).json("Tạo khóa học thành công");
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

/** POST CCCD */
userRouter.post(
  "/cccd",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { cccd_number, dateOfBirth, real_name } = req.body;
    const { _id } = req.user;

    try {
      const user = await UserModel.findById(_id);

      if (!user) {
        res.status(404).json({ message: "Không có user" });
      }

      user.cccd_number = cccd_number;
      (user.dateOfBirth = dateOfBirth), (user.real_name = real_name);

      await user.save();

      res.status(201).json("Xác nhận thông tin thành công");
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

/** POST CERTIFICATE */
userRouter.post(
  "/certificate",
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

/** POST COMMENT */
userRouter.post(
  "/post-comment",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { course_id, sentiment, content } = req.body;
    const { _id } = req.user;

    try {
      await ReviewModel.create({
        _id: uuidv4(),
        user_id: _id,
        course_id: course_id,
        sentiment: sentiment,
        content: content,
      });

      res.status(201).json({ message: "Tạo thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

export default userRouter;
