import express from "express";
import ReviewModel from "../models/review.model.js";
import { UserModel } from "../models/user.model.js";
import CourseModel from "../models/course.model.js";
import expressAsyncHandler from "express-async-handler";

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
        res.send(reviewsWithUserInfo);
      } else {
        res.status(404).send({ message: "No reviews found for this course" });
      }
    } catch (err) {
      res.status(500).send({ message: "Error fetching reviews", error: err });
    }
  })
);

/** GET REVIEWS AUTHOR */
reviewRouter.get(
  "/author/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const authorId = req.params.id;

      const author = await UserModel.findById(authorId);
      if (!author) {
        return res.status(404).send({ message: "Author not found" });
      }

      const authorInfo = {
        avatar: author.avatar,
        name: author.name,
        category: author.category, // Giả sử category là một trường của tác giả
      };

      const courses = await CourseModel.find({ user_id: authorId });

      const reviewsWithUsers = [];

      for (const course of courses) {
        const reviews = [];
        const courseInfo = { ...course.toObject() }; // Copy thông tin course

        for (const reviewId of course.reviews_Ids) {
          const review = await ReviewModel.findOne({ _id: reviewId });
          if (review) {
            const user = await UserModel.findOne({ _id: review.user_id });
            if (user) {
              reviews.push({
                ...review.toObject(),
                avatar: user.avatar,
                author: user.name,
              });
            }
          }
        }

        if (reviews.length > 0) {
          courseInfo.reviews = reviews; // Thêm thông tin reviews vào courseInfo
          reviewsWithUsers.push(courseInfo); // Thêm courseInfo vào danh sách trả về
        }
      }

      return res.status(200).send({ ...authorInfo, courses: reviewsWithUsers });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Error fetching data", error: err });
    }
  })
);

export default reviewRouter;
