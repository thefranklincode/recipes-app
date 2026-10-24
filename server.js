require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());





// Connect recipe routes
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.get("/test", (req, res) => {
    res.status(200).send("Recipes server is working!");
  });

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to Recipes API!",
      status: "Server is running",
      endpoints: {
        test: "/test",
        getAllRecipes: "/api/recipes"
      }
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();