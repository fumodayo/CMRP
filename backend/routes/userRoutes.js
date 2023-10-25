import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(200).send({
        _id: user._id,
        email: user.email,
        role: user.role,
      });
    }
    res.status(401).send({ message: "Sai tài khoản hoặc mật khẩu" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const { email, password, role } = req.body;
    console.log(req.body);

    const newUser = new User({
      email: email,
      password: password,
      role: role,
    });

    const user = await newUser.save();

    res.send({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  })
);

export default userRouter;
