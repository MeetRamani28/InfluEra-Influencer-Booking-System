const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name Is Required"],
      unique: [true, "Category Name Already Exists"],
      trim: true,
      minlength: [3, "Category Name Must Be At Least 3 Characters Long"],
      maxlength: [50, "Category Name Cannot Exceed 50 Characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description Cannot Exceed 300 Characters"],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Category", categorySchema);
