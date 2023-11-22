const express = require("express");
const tagRouter = express.Router();
const tagController = require("../controllers/TagsController");

const verifyJWT = require("../middleware/verifyJWT");
const veriryAdmin = require("../middleware/verifyAdmin");

tagRouter
  .route("/")
  .get(tagController.getAll)
  .post([verifyJWT, veriryAdmin], tagController.create);

tagRouter
  .route("/:id")
  .get(tagController.getOne)
  .put([verifyJWT, veriryAdmin], tagController.update)
  .delete([verifyJWT, veriryAdmin], tagController.deleteOne);

module.exports = tagRouter;
