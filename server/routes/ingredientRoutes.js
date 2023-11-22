const express = require("express");
const ingredientRouter = express.Router();
const ingredientController = require("../controllers/IngredientsController");

const verifyJWT = require("../middleware/verifyJWT");
const veriryAdmin = require("../middleware/verifyAdmin");

ingredientRouter
  .route("/")
  .get(ingredientController.getAll)
  .post([verifyJWT, veriryAdmin], ingredientController.create);

ingredientRouter
  .route("/:id")
  .get(ingredientController.getOne)
  .put([verifyJWT, veriryAdmin], ingredientController.update)
  .delete([verifyJWT, veriryAdmin], ingredientController.deleteOne);

module.exports = ingredientRouter;
