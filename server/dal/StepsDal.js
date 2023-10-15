const db = require("../models/index");
const step = db.step;

class StepsDal {
  getOne = async (id) => {
    return await step.findOne({
      where: { id: id },
      attributes: { exclude: ["recipeId"] },
    });
  };

  create = async (newStep) => {
    return await step.create(newStep);
  };

  update = async (id, stepToUpdate) => {
    return await step.update(stepToUpdate, { where: { id: id } });
  };

  deleteOne = async (id) => {
    await step.destroy({ where: { id: id } });
  };
}

module.exports = new StepsDal();
