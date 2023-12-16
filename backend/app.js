import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import courseRouter from "./routes/course.routes.js";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import reviewRouter from "./routes/review.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import instructorRouter from "./routes/instructor.routes.js";
import userRouter from "./routes/user.routes.js";
import cartRouter from "./routes/cart.routes.js";
import feedbackRouter from "./routes/feedback.routes.js";
import certificateRouter from "./routes/certificate.routes.js";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", authRouter);
app.use("/api/course", courseRouter);
app.use("/api/category", categoryRoutes);
app.use("/api/instructor", instructorRouter);
app.use("/api/review", reviewRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/certificate", certificateRouter);
app.use("/api/upload", uploadRoutes);
