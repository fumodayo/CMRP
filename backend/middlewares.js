import jwt from "jsonwebtoken";
import { UserModel } from "./models/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserModel.findById(decoded._id);

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const isInstructor = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const checked = decoded.role === "instructor";

    if (!checked) {
      return res
        .status(401)
        .json({ success: false, message: "Only Instructor access" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const checked = decoded.role.includes("admin");
    if (!checked) {
      return res
        .status(401)
        .json({ success: false, message: "Only Admin access" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
