const express = require("express");
const stepRouter = express.Router();
const stepController = require("../controllers/StepsController");

const verifyJWT = require("../middleware/verifyJWT");
stepRouter.use(verifyJWT);

stepRouter.route("/").post(stepController.create);

stepRouter
  .route("/:id")
  .get(stepController.getOne)
  .put(stepController.update)
  .delete(stepController.deleteOne);

module.exports = stepRouter;
