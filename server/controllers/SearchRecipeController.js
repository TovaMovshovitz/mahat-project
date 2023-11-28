const db = require("../models/index");
const { Op } = require("sequelize");
const recipe = db.recipe;
const tag = db.tag;
const ingredient = db.ingredient;
const recipeIngredient = db.recipeIngredient;
const category = db.category;

const generateWhereObj = (userId, name, maxPrepTime) => {
  let where = { userId: userId };
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (maxPrepTime) where.preperingTime = { [Op.lte]: maxPrepTime };
  return where
}

const generateIncludeList = (tags, cateogries, withIngredients) => {
  let include = []
  const parsedTagsList = tags ? tags.split(",").map(Number) : null;
  if (parsedTagsList && parsedTagsList.length > 0) {
    const tagInclude = {
      model: tag,
      through: {
        attributes: [],
      },
      where: { id: { [Op.in]: [parsedTagsList] } },
    }
    include.push(tagInclude)
  }

  const parsedCategoriesList = cateogries ? cateogries.split(",").map(Number) : null;
  if (parsedCategoriesList && parsedCategoriesList.length > 0) {
    const categoryInclude = {
      model: category,
      through: {
        attributes: [],
      },
      where: { id: { [Op.in]: [parsedCategoriesList] } },
    }
    include.push(categoryInclude)
  }

  const parsedIngredientsList = withIngredients ? withIngredients.split(",").map(Number) : null;
  if (parsedIngredientsList && parsedIngredientsList.length > 0) {
    const ingredientInclude = {
      model: recipeIngredient,
      include: [{ model: ingredient, where: { id: { [Op.in]: [parsedIngredientsList] } } }]
    }
    include.push(ingredientInclude)
  }
  return include
}
const search = async (req, res, next) => {
  const userId = req.user.id;
  const { name, cateogries, tags, maxPrepTime, withIngredients, offset, limit, } = req.query;

  if (!offset || !limit)
    return res.status(400).json({ message: "offset an dlimitare required" });

  try {
    const { count, rows } = await recipe.findAndCountAll({
      include: generateIncludeList(tags, cateogries, withIngredients),
      where: generateWhereObj(userId, name, maxPrepTime),
      offset: parseInt(offset),
      limit: parseInt(limit),
      distinct: true
    });

    res.json({ count, rows });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { search };
