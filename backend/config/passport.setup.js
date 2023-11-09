import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export const passportSetup = async () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "272334489618-0nrk5saiu0497f2jt60vv5v70m5ffv8p.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const email = profile.emails[0].value;

        console.log(email);
      }
    )
  );
};
