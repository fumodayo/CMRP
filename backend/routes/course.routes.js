import express from "express";
import expressAsyncHandler from "express-async-handler";
import Course from "../models/course.model.js";

const courseRouter = express.Router();

const PAGE_SIZE = 8;

courseRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;
    const courseCategory = query.type || "";
    const searchQuery = query.search || "";

    const filter = {
      status: { $in: ["OPEN", "IN_PROGRESS", "COMPLETED"] },
    };

    if (courseCategory) {
      filter.category = courseCategory;
    }

    const nameSearchRegex = new RegExp(searchQuery, "i");
    filter.name = nameSearchRegex;

    const courses = await Course.find(filter)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countingPage = await Course.countDocuments(filter);
    res.send({
      courses,
      countingPage,
      page,
      pages: Math.ceil(countingPage / pageSize),
    });
  })
);

courseRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.send(course);
    } else {
      res.status(404).send({ message: "Course not found" });
    }
  })
);

courseRouter.get(
  "/instructor/:author",
  expressAsyncHandler(async (req, res) => {
    const course = await Course.find({ author: req.params.author });
    if (course) {
      res.send(course);
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
      const newCourse = await Course.create({
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

      res.status(201).json(newCourse);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Server error" });
    }
  })
);

courseRouter.post(
  "/similar",
  expressAsyncHandler(async (req, res) => {
    const { _id } = req.body;

    const course = await Course.findById(_id);
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }

    const similarCourses = await Course.find({
      _id: { $ne: _id },
      category: { $in: course.category },
      status: { $in: ["OPEN", "IN_PROGRESS", "COMPLETED"] },
    }).limit(4);

    res.send(similarCourses);
  })
);

export default courseRouter;
