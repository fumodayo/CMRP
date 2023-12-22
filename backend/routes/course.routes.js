import express from "express";
import expressAsyncHandler from "express-async-handler";
import CourseModel from "../models/course.model.js";
import { UserModel } from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import ReviewModel from "../models/review.model.js";

const courseRouter = express.Router();

/** SEARCH & FILTER COURSE */
courseRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const PAGE_SIZE = 8;
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;
    const courseCategory = query.type || "";
    const searchQuery = query.search || "";

    const filter = {
      status: { $in: ["PUBLIC"] },
    };

    if (courseCategory) {
      filter.category = courseCategory;
    }

    const nameSearchRegex = new RegExp(searchQuery, "i");
    filter.name = nameSearchRegex;

    const courses = await CourseModel.find(filter)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countingPage = await CourseModel.countDocuments(filter);

    const coursesWithUserInfo = await Promise.all(
      courses.map(async (course) => {
        const instructor = await UserModel.findById(course.user_id);
        if (instructor) {
          return {
            ...course.toObject(),
            author: instructor.name,
            isCertificate: instructor.isCertificate,
          };
        }

        return { ...course.toObject(), avatar: null, name: null };
      })
    );

    res.send({
      courses: coursesWithUserInfo,
      countingPage,
      page,
      pages: Math.ceil(countingPage / pageSize),
    });
  })
);

/** GET COURSE DETAIL */
courseRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).send({ message: "Không tìm thấy khóa học" });
    }

    const instructor = await UserModel.findById(course.user_id);

    if (!instructor) {
      return res
        .status(404)
        .send({ message: "Không tìm thấy thông tin người dạy" });
    }

    const reviews = await ReviewModel.find({ course_id: id });

    const coursesWithUserInfo = {
      ...course.toObject(),
      author: instructor.name,
      author_image: instructor.avatar,
      reviews: reviews,
    };

    if (course) {
      res.send(coursesWithUserInfo);
    } else {
      res.status(404).send({ message: "Course not found" });
    }
  })
);

/** CREATE COURSE */
courseRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const {
      author,
      name,
      image,
      category,
      price,
      requirement,
      short_description,
      thumbnail,
      total_student,
      type,
      schedule,
      lesson,
      startDate,
      endDate,
    } = req.body;

    try {
      await CourseModel.create({
        _id: uuidv4(),
        author,
        name,
        image,
        category,
        price,
        requirement,
        short_description,
        thumbnail,
        total_student,
        type,
        schedule,
        lesson,
        startDate,
        endDate,
      });

      res.status(201).json("Tạo khóa học thành công");
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

/** GET SIMILAR COURSE */
courseRouter.post(
  "/similar",
  expressAsyncHandler(async (req, res) => {
    const { _id } = req.body;

    let query = {
      status: { $in: ["PUBLIC"] },
    };

    if (_id) {
      query._id = { $nin: _id };
    }

    const similarCourses = await CourseModel.find(query).limit(4);

    const coursesWithUserInfo = await Promise.all(
      similarCourses.map(async (course) => {
        const instructor = await UserModel.findById(course.user_id);
        if (instructor) {
          return {
            ...course.toObject(),
            author: instructor.name,
            isCertificate: instructor.isCertificate,
          };
        }

        return { ...course.toObject(), avatar: null, name: null };
      })
    );

    res.send(coursesWithUserInfo);
  })
);

export default courseRouter;
