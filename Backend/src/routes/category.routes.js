const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares");
const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getSingleCategory);

router.post("/", authMiddleware("ADMIN"), categoryController.createCategory);
router.put("/:id", authMiddleware("ADMIN"), categoryController.updateCategory);
router.delete(
  "/:id",
  authMiddleware("ADMIN"),
  categoryController.deleteCategory
);

module.exports = router;
