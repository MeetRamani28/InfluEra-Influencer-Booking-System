const express = require("express");
const router = express.Router();
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

module.exports = router;
