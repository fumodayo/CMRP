import express from "express";
import expressAsyncHandler from "express-async-handler";
import FeedbackModel from "../models/feedback.model.js";
import { v4 as uuidv4 } from "uuid";
import { isAuth } from "../middlewares.js";

const feedbackRouter = express.Router();

/** GET FEEDBACKS */
feedbackRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const feedbacks = await FeedbackModel.find({});
    if (feedbacks) {
      return res.status(200).send(feedbacks);
    }

    return res.status(501).send({ message: "Không thể lấy feedback" });
  })
);

/** POST FEEDBACK */
feedbackRouter.post(
  "/",
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

/** CHANGE STATUS: PENDING -> COMPLETED */
feedbackRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const feedbackId = req.params.id;
    try {
      const feedback = await FeedbackModel.findById(feedbackId);

      if (!feedback) {
        return res.status(404).json({ message: "Feedback không tồn tại" });
      }

      feedback.status = "COMPLETED";

      await feedback.save();
      res.status(200).json({ message: "Thay đổi thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

export default feedbackRouter;
