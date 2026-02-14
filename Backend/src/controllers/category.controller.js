const Category = require("../model/category.model");

/**
 * ----------------------------------------
 * CREATE CATEGORY (ADMIN ONLY)
 * POST /api/categories
 * ----------------------------------------
 */
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category Already Exists",
      });
    }

    const category = await Category.create({
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Creating Category",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * GET ALL ACTIVE CATEGORIES (PUBLIC)
 * GET /api/categories
 * ----------------------------------------
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Fetching Categories",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * GET SINGLE CATEGORY
 * GET /api/categories/:id
 * ----------------------------------------
 */
const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category || !category.isActive) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Fetching Category",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * UPDATE CATEGORY (ADMIN ONLY)
 * PUT /api/categories/:id
 * ----------------------------------------
 */
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    if (name) category.name = name;
    if (description) category.description = description;
    if (typeof isActive === "boolean") category.isActive = isActive;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Updating Category",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * DELETE CATEGORY (ADMIN ONLY)
 * DELETE /api/categories/:id
 * ----------------------------------------
 * Soft Delete (Better for Production)
 */
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    // Soft delete
    category.isActive = false;
    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Deleting Category",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
