import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";

import courseRouter from "./routes/course.routes.js";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session({ secret: "SECRET" }));

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "272334489618-0nrk5saiu0497f2jt60vv5v70m5ffv8p.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken, profile);
      return done(null, user);
    }
  )
);

app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/course", courseRouter);
app.use("/api/admin", adminRouter);
app.use("/api/upload", uploadRoutes);
