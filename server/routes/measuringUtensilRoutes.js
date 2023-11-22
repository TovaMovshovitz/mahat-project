const express = require("express");
const measuringUtensilRouter = express.Router();
const measuringUtensilController = require("../controllers/MeasuringUtensilsController");

const verifyJWT = require("../middleware/verifyJWT");
const veriryAdmin = require("../middleware/verifyAdmin");

measuringUtensilRouter
  .route("/")
  .get(measuringUtensilController.getAll)
  .post([verifyJWT, veriryAdmin], measuringUtensilController.create);

measuringUtensilRouter
  .route("/:id")
  .get(measuringUtensilController.getOne)
  .put([verifyJWT, veriryAdmin], measuringUtensilController.update)
  .delete([verifyJWT, veriryAdmin], measuringUtensilController.deleteOne);

module.exports = measuringUtensilRouter;
