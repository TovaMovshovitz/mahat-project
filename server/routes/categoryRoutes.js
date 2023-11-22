const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/CategoriesController");

const verifyJWT = require("../middleware/verifyJWT");
const veriryAdmin = require("../middleware/verifyAdmin");

categoryRouter
  .route("/")
  .get(categoryController.getAll)
  .post([verifyJWT, veriryAdmin], categoryController.create);

categoryRouter
  .route("/:id")
  .get(categoryController.getOne)
  .put([verifyJWT, veriryAdmin], categoryController.update)
  .delete([verifyJWT, veriryAdmin], categoryController.deleteOne);

module.exports = categoryRouter;
