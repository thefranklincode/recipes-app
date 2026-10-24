const express = require("express");
const router = express.Router();

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

// POST - Create recipe
router.post("/", createRecipe);

// GET - Get all recipes
router.get("/", getAllRecipes);

// GET - Get recipe by ID
router.get("/:id", getRecipeById);

// PUT - Update recipe
router.put("/:id", updateRecipe);

// DELETE - Delete recipe
router.delete("/:id", deleteRecipe);

module.exports = router;