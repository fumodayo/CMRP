import express from "express";
import expressAsyncHandler from "express-async-handler";
import FeedbackModel from "../models/feedback.model.js";

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

export default feedbackRouter;
