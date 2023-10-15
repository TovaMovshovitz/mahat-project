const express = require("express");
const recipeRouter = express.Router();
const recipeController = require("../controllers/RecipesController");

const verifyJWT = require("../middleware/verifyJWT");
//recipeRouter.use(verifyJWT);

recipeRouter
  .route("/")
  .get(recipeController.getAll)
  .post(recipeController.create);

recipeRouter
  .route("/:id")
  .get(recipeController.getOne)
  .put(recipeController.update)
  .delete(recipeController.deleteOne);

module.exports = recipeRouter;
