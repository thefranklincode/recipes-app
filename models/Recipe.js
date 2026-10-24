const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
    },

    ingredients: {
      type: [String],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "At least one ingredient is required",
      },
    },

    instructions: {
      type: String,
      required: [true, "Instructions are required"],
      trim: true,
    },

    cookingTime: {
      type: Number,
      required: [true, "Cooking time is required"],
      min: [1, "Cooking time must be at least 1 minute"],
    },

    category: {
      type: String,
      trim: true,
      default: "Other",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);