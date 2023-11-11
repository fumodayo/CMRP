import express from "express";
import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model.js";
import { sendToken } from "../utils.js";
import passport from "passport";

const authRouter = express.Router();

/** SIGN IN */
authRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).send({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).send({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    sendToken(res, user, 200, "Login successful");
  })
);

/** SIGN UP */
authRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    user = await UserModel.create({
      email,
      password,
    });

    sendToken(res, user, 201, "User have been created");
  })
);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/google/failure",
  });
});

authRouter.get("/google/failure", (res) => {
  res.send("Failed to login");
  console.log("Failed to login");
});

authRouter.get("/protected", (res) => {
  res.send("Profile has been");
  console.log("Profile has been");
});

/** LOGOUT */
authRouter.get(
  "/logout",
  expressAsyncHandler(async (req, res) => {
    return res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()) })
      .json({ success: true, message: "Logged out successfully" });
  })
);

export default authRouter;
