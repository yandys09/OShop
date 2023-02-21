const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter category name."],
      trim: true,
      unique: [true, "This category is exists."],
    },
    description: {
      type: String,
      required: [true, "Please enter category description."],
    },
    addedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
    updatedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
    discontinued: {
      Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
