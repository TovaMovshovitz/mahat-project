const express = require("express");
const tagRouter = express.Router();
const tagController = require("../controllers/TagsController");


tagRouter.route("/").get(tagController.getAll).post(tagController.create);

tagRouter
  .route("/:id")
  .get(tagController.getOne)
  .put(tagController.update)
  .delete(tagController.deleteOne);

module.exports = tagRouter;
