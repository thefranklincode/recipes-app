
const Recipe = require("../models/Recipe");

// 1. CREATE a new recipe
const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);

    res.status(201).json({
      message: "Recipe created successfully",
      recipe,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create recipe",
      error: error.message,
    });
  }
};

// 2. READ all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    res.status(200).json({
      count: recipes.length,
      recipes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch recipes",
      error: error.message,
    });
  }
};

// 3. READ a single recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    const isInvalidId = error.name === "CastError";

    res.status(isInvalidId ? 400 : 500).json({
      message: isInvalidId
        ? "Invalid recipe ID"
        : "Failed to fetch recipe",
    });
  }
};

// 4. UPDATE a recipe by ID
const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedRecipe) {
      return res.status(404).json({
        message: "Recipe not found"
      });
    }

    return res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe
    });
  } catch (error) {
    return res.status(400).json({
      message: "Update failed",
      error: error.message
    });
  }
};

// 5. DELETE a recipe by ID
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      message: "Recipe deleted successfully",
      recipe,
    });
  } catch (error) {
    const isInvalidId = error.name === "CastError";

    res.status(isInvalidId ? 400 : 500).json({
      message: isInvalidId
        ? "Invalid recipe ID"
        : "Failed to delete recipe",
    });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
