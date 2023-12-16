import express from "express";
import expressAsyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import CertificateModel from "../models/certificate.model.js";
import { isAuth } from "../middlewares.js";
import { UserModel } from "../models/user.model.js";

const certificateRouter = express.Router();

/** GET CERTIFICATES */
certificateRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const reviews = await CertificateModel.find({});
    if (reviews) {
      return res.status(200).send(reviews);
    }

    return res.status(501).send({ message: "Không có certificate" });
  })
);

/** POST VERIFY -> UPDATE USER */
certificateRouter.put(
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { real_name, cccd_number, dateOfBirth } = req.body;
    try {
      const user = await UserModel.findById(_id);

      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      user.real_name = real_name;
      user.cccd_number = cccd_number;
      user.dateOfBirth = dateOfBirth;

      await user.save();

      res.status(201).json({ message: "Xác thực thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

/** POST CERTIFICATES */
certificateRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { category, images } = req.body;
    try {
      await CertificateModel.create({
        _id: uuidv4(),
        user_id: _id,
        category,
        images,
      });
      res.status(201).json({ message: "Tạo thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

/** VERIFY CERTIFICATE -> CHANGE isCERTIFICATE & CATEGORY USER*/
certificateRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const certificateId = req.params.id;
    const { status } = req.body;
    try {
      const certificate = await CertificateModel.findById(certificateId);

      if (!certificate) {
        return res.status(404).json({ message: "Certificate không tồn tại" });
      }
      if (status === "COMPLETED") {
        certificate.status = "COMPLETED";
        certificate.save();

        const user = await UserModel.findById(certificate.user_id);
        user.isCertificate = true;
        user.save();

        return res.status(201).json({ message: "Xác thực thành công" });
      } else if (status === "REJECTED") {
        certificate.status = "REJECTED";
        certificate.save();

        return res.status(201).json({ message: "Đã từ chối xác thực" });
      } else {
        return res.status(400).json({ message: "Trạng thái không hợp lệ" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  })
);

export default certificateRouter;
