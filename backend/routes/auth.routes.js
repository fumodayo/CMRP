import express from "express";
import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model.js";
import { sendToken } from "../utils.js";

const authRouter = express.Router();

/** SIGN IN */
authRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

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
    const { email, password, role, name } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing email or password" });
    }

    let user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản đã tồn tại" });
    }

    // Kiểm tra xem `name` có tồn tại không trước khi sử dụng nó
    const userData = {
      email,
      password,
      role,
      name: name || "", // Sử dụng name nếu tồn tại, nếu không sẽ là chuỗi rỗng
    };

    user = await UserModel.create(userData);

    sendToken(res, user, 201, "User have been created");
  })
);

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
