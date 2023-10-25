import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import courseRouter from "./routes/courseRoutes.js";

mongoose
  .connect("mongodb+srv://fumodayo:fumodayo@cluster0.ar4943c.mongodb.net/")
  .then(() => console.log("mongodb"))
  .catch((err) => {
    console.log(err.message);
  });

export const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
