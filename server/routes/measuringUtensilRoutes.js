const express = require("express");
const measuringUtensilRouter = express.Router();
const measuringUtensilController = require("../controllers/MeasuringUtensilsController");



measuringUtensilRouter
  .route("/")
  .get(measuringUtensilController.getAll)
  .post(measuringUtensilController.create);

measuringUtensilRouter
  .route("/:id")
  .get(measuringUtensilController.getOne)
  .put(measuringUtensilController.update)
  .delete(measuringUtensilController.deleteOne);

module.exports = measuringUtensilRouter;
