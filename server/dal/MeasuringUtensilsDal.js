const db = require("../models/index");
const measuringUtensil = db.measuringUtensil;

class MeasuringUtensilsDal {
  getAll = async (req, res) => {
    return await measuringUtensil.findAll();
  };

  getOne = async (id) => {
    return await measuringUtensil.findByPk(id);
  };

  create = async (newMeasuringUtensil) => {
    return await measuringUtensil.create(newMeasuringUtensil);
  };

  update = async (id, measuringUtensilToUpdate) => {
    return await measuringUtensil.update(measuringUtensilToUpdate, {
      where: { id: id },
    });
  };

  deleteOne = async (id) => {
    await measuringUtensil.destroy({ where: { id: id } });
  };
}

module.exports = new MeasuringUtensilsDal();
