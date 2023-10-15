const db = require("../models/index");
const category = db.category;

class CategoriesDal {
  getAll = async (req, res) => {
    return await category.findAll();
  };

  getOne = async (id) => {
    return await category.findByPk(id);
  };

  create = async (name) => {
    return await category.create({ name });
  };

  update = async (id, name) => {
    return await category.update({ name }, { where: { id: id } });
  };

  deleteOne = async (id) => {
    await category.destroy({ where: { id: id } });
  };
}

module.exports = new CategoriesDal();
