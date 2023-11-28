const db = require("../models/index");
const { Op } = require("sequelize");
const recipe = db.recipe;
const tag = db.tag;
const ingredient = db.ingredient;
const recipeIngredient = db.recipeIngredient;
const category = db.category;

const search = async (req, res, next) => {
  const userId = req.user.id;
  const {
    name,
    cateogries,
    tags,
    maxPrepTime,
    withIngredients,
    offset,
    limit,
  } = req.query;
  let where = { userId: userId };
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (maxPrepTime) where.preperingTime = { [Op.lte]: maxPrepTime };

  let tagsWhere = {};
  const parsedTagsList = tags ? tags.split(",").map(Number) : null;
  if (parsedTagsList && parsedTagsList.length > 0) {
    tagsWhere.id = { [Op.in]: parsedTagsList };
  }

  let categoriesWhere = {};
  const parsedCategoriesList = cateogries ? cateogries.split(",").map(Number) : null;
  if (parsedCategoriesList && parsedCategoriesList.length > 0) {
    categoriesWhere.id = { [Op.in]: parsedCategoriesList };
  }

  let ingredientsWhere = {};
  const parsedIngredientsList = withIngredients ? withIngredients.split(",").map(Number) : null;
  if (parsedIngredientsList && parsedIngredientsList.length > 0) {
    ingredientsWhere.id = { [Op.in]: parsedIngredientsList };
  }

  try {
    const { count, rows } = await recipe.findAndCountAll({
      include: [
        {
          model: tag,
          through: {
            attributes: [],
          },
          where: tagsWhere,
        },
        {
          model: category,
          through: {
            attributes: [],
          },
          where: categoriesWhere,
        },
        {
          model: recipeIngredient,
          include: [{ model: ingredient, where: ingredientsWhere }],
        },
      ],
      where: where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      distinct: true
    });

    res.json({ count, rows });
  } catch (error) {
    next(error);
  }
};

module.exports = { search };
