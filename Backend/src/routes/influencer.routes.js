const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares");
const influencerController = require("../controllers/influencer.controller");

router.get(
  "/dashboard",
  authMiddleware("INFLUENCER"),
  influencerController.getInfluencerDashboardStats
);

module.exports = router;
