import express from "express";
import { UserModel } from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../middlewares.js";

const adminRouter = express.Router();

/** GET USERS */
adminRouter.get(
  "/user",
  expressAsyncHandler(async (req, res) => {
    const users = await UserModel.find({});
    if (users) {
      return res.status(200).send(users);
    }

    return res.status(501).send({ message: "Authentication" });
  })
);

export default adminRouter;
