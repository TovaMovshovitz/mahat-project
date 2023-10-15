const db = require("../models/index");
const { sequelize } = require("sequelize");

const recipe = db.recipe;
const step = db.step;
const ingredient = db.ingredient;
const measuringUtensil = db.measuringUtensil;
const tag = db.tag;
const category = db.category;
const recipeIngredient = db.recipeIngredient;

class RecipesDal {
  getAll = async (userId) => {
    return await recipe.findAll({
      where: { userId: userId },
    });
  };

  getOne = async (id, userId) => {
    const singleRecipe = await recipe.findOne({
      where: { id: id, userId: userId },
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: recipeIngredient,
          include: [measuringUtensil, ingredient],
        },

        step,

        {
          model: tag,
          through: {
            attributes: [],
          },
        },
        {
          model: category,
          through: {
            attributes: [],
          },
        },
      ],
    });
    return singleRecipe;
  };

  create = async (newRecipe, categories, tags, ingredients) => {
    //return result = await sequelize.transaction(async (t) => {
    const createdRecipe = await recipe.create(newRecipe, {
      include: [step],
    });
    await createdRecipe.addTags(await tag.findAll({ where: { id: tags } }));
    await createdRecipe.addCategories(
      await category.findAll({ where: { id: categories } })
    );
    ingredients?.map((x) => (x.recipeId = createdRecipe.id));
    if (ingredients?.length > 0) await recipeIngredient.bulkCreate(ingredients);
    return createdRecipe; // await this.getOne(createdRecipe.id, createdRecipe.userId);
    // });
  };

  update = async (id, recipeToUpdate, categories, tags, ingredients) => {
    await this.deleteOne(id, recipeToUpdate.userId);
    return await this.create(recipeToUpdate, categories, tags, ingredients);
  };

  deleteOne = async (id, userId) => {
    await recipe.destroy({ where: { id: id } });
  };
}

module.exports = new RecipesDal();
