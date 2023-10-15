const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/CategoriesController");

categoryRouter
  .route("/")
  .get(categoryController.getAll)
  .post(categoryController.create);

categoryRouter
  .route("/:id")
  .get(categoryController.getOne)
  .put(categoryController.update)
  .delete(categoryController.deleteOne);

module.exports = categoryRouter;
