const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../config/multer.config");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

/** POST /api/auth/register */
router.post(
  "/register",
  upload.single("influencerImage"),
  authController.register
);

/* POST /api/auth/login */
router.post("/login", authController.login);

/**
 * - POST /api/auth/logout
 */
router.post(
  "/logout",
  authMiddleware("ADMIN", "INFLUENCER", "USER"),
  authController.logout
);

/* =====================================================
   GOOGLE OAUTH ROUTES
===================================================== */

/**
 * GET /api/auth/google
 * Redirects to Google login page
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * GET /api/auth/google/callback
 * Handles Google response
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    try {
      const { token } = req.user;

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect(process.env.FRONTEND_URL || "http://localhost:5173");
    } catch (error) {
      res.redirect(
        (process.env.FRONTEND_URL || "http://localhost:5173") +
          "/login?error=oauth_failed"
      );
    }
  }
);

module.exports = router;
