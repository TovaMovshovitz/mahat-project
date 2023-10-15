const express = require("express");
const recipeRouter = express.Router();
const SearchRecipeController = require("../controllers/SearchRecipeController");

const verifyJWT = require("../middleware/verifyJWT");
recipeRouter.use(verifyJWT);

recipeRouter.route("/").get(SearchRecipeController.search);

module.exports = recipeRouter;
