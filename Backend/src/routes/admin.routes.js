const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares");
const adminController = require("../controllers/admin.controller");

router.get(
  "/dashboard",
  authMiddleware("ADMIN"),
  adminController.getAdminDashboardStats
);

module.exports = router;
