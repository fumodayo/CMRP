import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";

const upload = multer();

const uploadRoutes = express.Router();

uploadRoutes.post("/single", upload.single("file"), async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);
    return res.send(result);
  } catch (error) {
    return res.status(500).send("Có lỗi xảy ra trong quá trình tải lên");
  }
});

// Upload nhiều files với tên trường input là 'files'
uploadRoutes.post("/multi", upload.array("files"), async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Xử lý từng file trong mảng files
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    });

    // Chờ tất cả các promises hoàn thành
    const results = await Promise.all(uploadPromises);
    return res.send(results);
  } catch (error) {
    return res.status(500).send("Có lỗi xảy ra trong quá trình tải lên");
  }
});

export default uploadRoutes;
