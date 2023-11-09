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

    const filter = {};
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

export default courseRouter;
