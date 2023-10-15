const db = require("../models/index");
const ingredient = db.ingredient;

class IngredientsDal {
  getAll = async (req, res) => {
    return ingredient.findAll();
  };

  getOne = async (id) => {
    return await ingredient.findByPk(id);
  };

  create = async (newIngredient) => {
    return await ingredient.create(newIngredient);
  };

  update = async (id, ingredientToUpdate) => {
    return await ingredient.update(ingredientToUpdate, { where: { id: id } });
  };

  deleteOne = async (id) => {
    await ingredient.destroy({ where: { id: id } });
  };
}

module.exports = new IngredientsDal();
