import express from "express";
import ReviewModel from "../models/review.model.js";
import { UserModel } from "../models/user.model.js";
import CourseModel from "../models/course.model.js";
import expressAsyncHandler from "express-async-handler";
import CertificateModel from "../models/certificate.model.js";

const reviewRouter = express.Router();

/** GET REVIEWS */
reviewRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const reviews = await ReviewModel.find({});
    if (reviews) {
      return res.status(200).send(reviews);
    }

    return res.status(501).send({ message: "Can't get reviews" });
  })
);

/** GET COURSE REVIEW */
reviewRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const courseId = req.params.id;

    try {
      const reviewsWithUserInfo = await ReviewModel.aggregate([
        { $match: { course_id: courseId } },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            _id: 1,
            isUnnamed: 1,
            course_id: 1,
            createdAt: 1,
            content: 1,
            rating: 1,
            avatar: "$user.avatar",
            name: "$user.name",
          },
        },
      ]);

      if (reviewsWithUserInfo.length > 0) {
        return res.send(reviewsWithUserInfo);
      } else {
        return res
          .status(404)
          .send({ message: "Chưa có đánh giá vì khóa học chưa dạy" });
      }
    } catch (err) {
      res.status(500).send({ message: "Error fetching reviews", error: err });
    }
  })
);

/** GET REVIEWS AUTHOR BY ID,TYPE,RATING */
reviewRouter.get(
  "/author/:id/:type/:rating",
  expressAsyncHandler(async (req, res) => {
    try {
      const authorId = req.params.id;
      const typeFilter = req.params.type !== "all" ? req.params.type : null;
      const ratingFilter =
        req.params.rating !== "all" ? parseInt(req.params.rating) : null;

      const author = await UserModel.findById(authorId);
      if (!author) {
        return res.status(404).send({ message: "Không tìm thấy người dạy" });
      }

      const authorInfo = {
        avatar: author.avatar,
        name: author.name,
        category: author.category,
      };

      let courses = [];
      if (typeFilter !== null && ratingFilter !== null) {
        courses = await CourseModel.find({
          user_id: authorId,
          category: typeFilter,
        });
      } else if (typeFilter !== null) {
        courses = await CourseModel.find({
          user_id: authorId,
          category: typeFilter,
        });
      } else if (ratingFilter !== null) {
        courses = await CourseModel.find({
          user_id: authorId,
        });
      } else {
        courses = await CourseModel.find({ user_id: authorId });
      }

      const reviewsWithUsers = [];

      for (const course of courses) {
        let courseReviews = [];
        if (ratingFilter !== null) {
          courseReviews = await ReviewModel.find({
            course_id: course._id,
            rating: ratingFilter,
          });
        } else {
          courseReviews = await ReviewModel.find({
            course_id: course._id,
          });
        }
        if (courseReviews.length > 0) {
          const reviews = [];
          for (const review of courseReviews) {
            const user = await UserModel.findOne({ _id: review.user_id });
            if (user) {
              reviews.push({
                ...review.toObject(),
                avatar: user.avatar,
                author: user.name,
              });
            }
          }
          const courseInfo = {
            ...course.toObject(),
            reviews: reviews,
          };
          reviewsWithUsers.push(courseInfo);
        }
      }

      const certificates = await CertificateModel.distinct("category", {
        user_id: authorId,
        status: "COMPLETED",
      });

      return res.status(200).send({
        ...authorInfo,
        courses: reviewsWithUsers,
        certificates: certificates,
      });
    } catch (err) {
      return res.status(500).send({ message: "Lỗi server", error: err });
    }
  })
);

export default reviewRouter;
