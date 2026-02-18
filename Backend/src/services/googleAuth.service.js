const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

/**
 * Generate JWT Token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/**
 * Initialize Google OAuth Strategy
 */
const initializeGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;

          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              fullName: profile.displayName,
              email,
              password: "GOOGLE_OAUTH_USER",
              role: "USER",
            });
          }

          const token = generateToken(user);

          return done(null, { user, token });
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};

module.exports = { initializeGoogleStrategy };
