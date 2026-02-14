const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares");
const userController = require("../controllers/user.controller");

router.get(
  "/me",
  authMiddleware("USER", "INFLUENCER", "ADMIN"),
  userController.getMyProfile
);
router.put(
  "/me",
  authMiddleware("USER", "INFLUENCER"),
  userController.updateMyProfile
);

router.post("/", authMiddleware("ADMIN"), userController.createUserByAdmin);
router.get("/", authMiddleware("ADMIN"), userController.getAllUsers);
router.put("/:id", authMiddleware("ADMIN"), userController.updateUserByAdmin);
router.delete(
  "/:id",
  authMiddleware("ADMIN"),
  userController.deleteUserByAdmin
);

module.exports = router;
